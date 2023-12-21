import axios from "axios";
import {
  Category,
  GalleryDetail,
  GalleriesWithTrending,
  RelatedGallery,
} from "../interfaces";
import { useApiEndpointStore } from "../store";

const httpClient = axios.create({
  timeout: import.meta.env.VITE_APP_STALE_TIME,
});

const _getBaseUrl = () => {
  const selectedEndpoint = useApiEndpointStore.getState().selectedEndpoint;
  return selectedEndpoint.endpoint;
};

export const getCategories = async () => {
  const { data: categories } = await httpClient.get<Category[]>("/categories", {
    baseURL: _getBaseUrl(),
  });
  return categories;
};

export const getGalleriesByCategory = async (
  categoryName: string,
  page: number
) => {
  const { data } = await httpClient.get<GalleriesWithTrending>(
    `/category/${categoryName}/page/${page}`,
    {
      baseURL: _getBaseUrl(),
    }
  );
  return data;
};

export const getGalleriesByTag = async (tagName: string, page: number) => {
  const { data } = await httpClient.get<GalleriesWithTrending>(
    `/tag/${tagName}/page/${page}`,
    {
      baseURL: _getBaseUrl(),
    }
  );
  return data;
};

export const getGalleryDetail = async (link: string) => {
  const { data: galleryDetail } = await httpClient.get<GalleryDetail>(
    `/detail?link=${link}`,
    {
      baseURL: _getBaseUrl(),
    }
  );
  return galleryDetail;
};

export const getGalleries = async (page: number) => {
  const { data } = await httpClient.get<GalleriesWithTrending>(
    `/page/${page}`,
    {
      baseURL: _getBaseUrl(),
    }
  );
  return data;
};

export const getRelatedGalleries = async (link: string) => {
  const { data } = await httpClient.get<RelatedGallery[]>(
    `/related?link=${link}`,
    { baseURL: _getBaseUrl() }
  );
  return data;
};
