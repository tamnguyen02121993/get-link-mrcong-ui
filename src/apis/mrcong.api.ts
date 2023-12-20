import axios from "axios";
import {
  Category,
  GalleryDetail,
  GalleriesWithTrending,
  RelatedGallery,
} from "../interfaces";

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
  const { data } = await httpClient.get<GalleriesWithTrending>(
    `/category/${categoryName}/page/${page}`
  );
  return data;
};

export const getGalleriesByTag = async (tagName: string, page: number) => {
  const { data } = await httpClient.get<GalleriesWithTrending>(
    `/tag/${tagName}/page/${page}`
  );
  return data;
};

export const getGalleryDetail = async (link: string) => {
  const { data: galleryDetail } = await httpClient.get<GalleryDetail>(
    `/detail?link=${link}`
  );
  return galleryDetail;
};

export const getGalleries = async (page: number) => {
  const { data } = await httpClient.get<GalleriesWithTrending>(`/page/${page}`);
  return data;
};

export const getRelatedGalleries = async (link: string) => {
  const { data } = await httpClient.get<RelatedGallery[]>(
    `/related?link=${link}`
  );
  return data;
};
