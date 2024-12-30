import * as Location from "expo-location";
import { PermissionStatus } from "@/infrastructure/interfaces/location";
import { Alert, Linking } from "react-native";

// objetivo lansar la ventana que pide el permiso para activar la locacion
export const requestLocationPermission =
  async (): Promise<PermissionStatus> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      if (status === "denied") {
        manualPermissionRequest();
      }
      return PermissionStatus.DENIED;
    }

    return PermissionStatus.GRANTED;
  };

// Lo voy a revisar sino llamo la funcion de arriba
export const checkLocationPermission = async () => {
  const { status } = await Location.getForegroundPermissionsAsync();

  switch (status) {
    case "granted":
      return PermissionStatus.GRANTED;
    case "denied":
      return PermissionStatus.DENIED;

    default:
      return PermissionStatus.UNDETERMINED;
  }
};

const manualPermissionRequest = async () => {
  // Lanzar los ajustes de la aplicacción
  Alert.alert(
    "Permisso de ubicacion necesario",
    "Para continuar debe de habilitar el permiso de location en los ajustes de la app",
    [
      {
        text: "Abrir ajustes",
        onPress: () => {
          Linking.openSettings();
        },
      },
      { text: "Cancel", style: "destructive" },
    ]
  );
};
