import { LatLng } from "@/infrastructure/interfaces/lat-lng";
import { useLocationStore } from "@/presentation/store/useLocationStore";
import { useEffect } from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

interface Props extends ViewProps {
  showUserLocation?: boolean;
  initialLocation: LatLng;
}

const CustomMap = ({
  initialLocation,
  showUserLocation = true,
  ...rest
}: Props) => {
  const { watchLocation, clearWatchLocation } = useLocationStore();

  useEffect(() => {
    watchLocation();

    return () => {
      clearWatchLocation();
    };
  }, []);

  return (
    <View {...rest}>
      <MapView
        showsUserLocation={showUserLocation}
        style={style.map}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
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
