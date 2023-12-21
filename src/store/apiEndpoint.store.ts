import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ApiEndpoint } from "../interfaces";
import { DEFAULT_ENDPOINTS } from "../commons";

interface ApiEndpointStore {
  selectedEndpoint: ApiEndpoint;
  setSelectedEndpoint: (endpoint: ApiEndpoint) => void;
}

const useApiEndpointStore = create<ApiEndpointStore>()(
  persist(
    (set) => ({
      selectedEndpoint: DEFAULT_ENDPOINTS[0],
      setSelectedEndpoint: (endpoint: ApiEndpoint) =>
        set(() => ({ selectedEndpoint: endpoint })),
    }),
    {
      name: "apiEndpoint",
    }
  )
);

export default useApiEndpointStore;
