import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const MapScreen = () => {
  return (
    <View style={style.container}>
      <MapView
        style={style.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 19.409898,
          longitude: -99.179717,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 19.409898,
            longitude: -99.179717,
          }}
          title="Aqui Estoy"
          description="Esta es mi casa en CDMX"
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
