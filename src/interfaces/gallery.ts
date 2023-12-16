export interface Gallery {
  title: string;
  href: string;
  coverImage: string;
  page: number;
  category: string;
}

export interface GalleryDetail {
  link: string;
  downloadLink: {
    originalLink: string;
    convertedLink: string;
  };
  imageList: string[];
  info: string[];
}
