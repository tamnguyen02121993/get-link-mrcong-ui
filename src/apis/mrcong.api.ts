import axios from "axios";
import { Category, Gallery, GalleryDetail } from "../interfaces";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_APP_MRCONG_API_ENDPOINT,
  timeout: import.meta.env.VITE_APP_STALE_TIME,
});

export const getCategories = async () => {
  const { data: categories } = await httpClient.get<Category[]>("/categories");
  return categories;
};

export const getGalleriesByCategory = async (
  categoryName: string,
  page: number
) => {
  const { data: galleries } = await httpClient.get<Gallery[]>(
    `/category/${categoryName}/page/${page}`
  );
  return galleries;
};

export const getGalleryDetail = async (link: string) => {
  const { data: galleryDetail } = await httpClient.get<GalleryDetail>(
    `/detail?link=${link}`
  );
  return galleryDetail;
};
