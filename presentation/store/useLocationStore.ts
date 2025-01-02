import {
  getCurrentLocation,
  watchCurrentPosition,
} from "@/core/actions/location/location";
import { LatLng } from "@/infrastructure/interfaces/lat-lng";
import { LocationSubscription } from "expo-location";
import { create } from "zustand";

interface LocationState {
  lastKnowLocation: LatLng | null; //Última ubicación conocida
  userLocationList: LatLng[]; // Lista de ubicaciones detectadas mientras se observa la posición del usuario.
  watchSubscriptionID: LocationSubscription | null; // Identificador de la suscripción a los cambios de ubicación

  // Obtengo la ubicacion actual
  getLocation: () => Promise<LatLng>;
  // Observo los cambios de posicion del usuario
  watchLocation: () => void;
  // Cancelo la suscripcion a los cambios de ubicacion
  clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnowLocation: null,
  userLocationList: [],
  watchSubscriptionID: null,

  // Llama a getCurrentLocation para obtener la ubicación actual del usuario. y actualizo estado
  getLocation: async () => {
    const location = await getCurrentLocation();
    set({ lastKnowLocation: location });
    return location;
  },

  // Verifica si ya hay una suscripción activa,
  watchLocation: async () => {
    const oldSubscription = get().watchSubscriptionID;

    if (oldSubscription !== null) {
      get().clearWatchLocation();
    }

    const watchSubscription = await watchCurrentPosition((latLng) => {
      set({
        lastKnowLocation: latLng,
        userLocationList: [...get().userLocationList, latLng],
      });
    });

    set({ watchSubscriptionID: watchSubscription });
  },

  // Verifica si existe una suscripción activa, Si existe, llama al método remove() de LocationSubscription para cancelarla.
  clearWatchLocation: async () => {
    const subscription = get().watchSubscriptionID;

    if (subscription !== null) {
      subscription.remove();
    }
  },
}));
