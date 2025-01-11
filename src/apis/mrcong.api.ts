import axios from "axios";
import {
  Category,
  GalleryDetail,
  GalleriesWithTrending,
  RelatedGallery,
  GalleryFirstDetail,
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
  const { data: galleryFirstDetail } = await httpClient.get<GalleryFirstDetail>(
    `/first-detail?link=${link}`,
    {
      baseURL: _getBaseUrl(),
    }
  );
  const { totalPages, ...galleryDetail } = galleryFirstDetail;
  if (totalPages === 1) {
    return galleryDetail;
  }
  for (let index = 2; index <= totalPages; index++) {
    let anotherLink = `${link}/${index}`;
    if (link.endsWith("/")) {
      anotherLink = `${link}${index}`;
    }

    const { data: galleryAnothertDetail } = await httpClient.get<string[]>(
      `/another-detail?link=${anotherLink}`,
      {
        baseURL: _getBaseUrl(),
      }
    );
    galleryDetail.imageList.push(...galleryAnothertDetail);
  }
  return galleryDetail as GalleryDetail;
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

export const getFavoriteModels = async () => {
  const { data: models } = await httpClient.get<string[]>("/models.json", {
    baseURL: _getBaseUrl().replace("/api/mrcong", ""),
  });
  return models;
};
