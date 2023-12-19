import { Tag } from ".";

export interface Trending {
  href: string;
  title: string;
  img: {
    src: string;
    srcSet: string;
  };
}

export interface Gallery {
  title: string;
  href: string;
  coverImage: string;
  page: number;
  category: string;
  tags: Tag[];
}

export interface GalleriesWithTrending {
  items: Gallery[];
  trending: Trending[];
}

export interface GalleryDetail {
  link: string;
  downloadLink: {
    originalLink: string;
    convertedLink: string;
  };
  info: string[];
  tags: Tag[];
  imageList: string[];
}
