import { ApiEndpoint } from "../interfaces";

export const DEFAULT_ENDPOINTS: ApiEndpoint[] = [
  {
    name: "Vercel",
    endpoint: import.meta.env.VITE_APP_MRCONG_API_VERCEL_ENDPOINT,
  },
  {
    name: "Render",
    endpoint: import.meta.env.VITE_APP_MRCONG_API_RENDER_ENDPOINT,
  },
];
