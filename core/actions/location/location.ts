import * as Location from "expo-location";
import { LatLng } from "@/infrastructure/interfaces/lat-lng";

export const getCurrentLocation = async (): Promise<LatLng> => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  } catch (error) {
    throw new Error("Error getting users locations");
  }
};

export const watchCurrentPosition = (
  locationCallBack: (location: LatLng) => void
) => {
  return Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 10,
    },
    ({ coords }) => {
      locationCallBack({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  );
};
