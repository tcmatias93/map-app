import { LatLng } from "@/infrastructure/interfaces/lat-lng";
import { useLocationStore } from "@/presentation/store/useLocationStore";
import { useEffect, useRef, useState } from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import FAB from "../shared/FAB";

interface Props extends ViewProps {
  showUserLocation?: boolean;
  initialLocation: LatLng;
}

const CustomMap = ({
  initialLocation,
  showUserLocation = true,
  ...rest
}: Props) => {
  const mapRef = useRef<MapView>(null);
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [isShowPolyne, setIsShowPolyne] = useState(true);
  const {
    watchLocation,
    clearWatchLocation,
    lastKnowLocation,
    getLocation,
    userLocationList,
  } = useLocationStore();

  useEffect(() => {
    watchLocation();

    return () => {
      clearWatchLocation();
    };
  }, []);

  useEffect(() => {
    if (lastKnowLocation && isFollowingUser) {
      moveCameraToLocation(lastKnowLocation);
    }
  }, [lastKnowLocation, isFollowingUser]);

  const moveCameraToLocation = (latLng: LatLng) => {
    if (!mapRef.current) return;

    mapRef.current.animateCamera({
      center: latLng,
    });
  };

  const moveToCurrentLocation = async () => {
    if (!lastKnowLocation) {
      moveCameraToLocation(initialLocation);
    } else {
      moveCameraToLocation(lastKnowLocation);
    }

    const location = await getLocation();

    if (!location) return;

    moveCameraToLocation(location);
  };

  return (
    <View {...rest}>
      <MapView
        onTouchStart={() => setIsFollowingUser(false)}
        ref={mapRef}
        showsUserLocation={showUserLocation}
        style={style.map}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {isShowPolyne && (
          <Polyline
            coordinates={userLocationList}
            strokeColor="red"
            strokeWidth={5}
          />
        )}
      </MapView>

      <FAB
        iconName={isShowPolyne ? "eye-off-outline" : "eye-outline"}
        onPress={() => setIsShowPolyne(!isShowPolyne)}
        style={{
          bottom: 130,
          right: 20,
        }}
      />

      <FAB
        iconName={isFollowingUser ? "walk-outline" : "accessibility-outline"}
        onPress={() => setIsFollowingUser(!isFollowingUser)}
        style={{
          bottom: 75,
          right: 20,
        }}
      />

      <FAB
        iconName="compass-outline"
        onPress={moveToCurrentLocation}
        style={{
          bottom: 20,
          right: 20,
        }}
      />
    </View>
  );
};

export default CustomMap;

const style = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
