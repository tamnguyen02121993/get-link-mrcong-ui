import { Navigate, useParams } from "react-router-dom";
import { GalleryItem, Loading, Pagination } from "../components";
import { useQuery } from "@tanstack/react-query";
import { Gallery, GalleriesWithTrending } from "../interfaces";
import { QUERY_KEYS } from "../commons/keys";
import { getGalleriesByTag } from "../apis";
import { usePaginationStore } from "../store";
import { useInitData } from "../hooks";

const GalleriesByTag: React.FC = () => {
  useInitData();
  const { tag, page } = useParams();
  const { page: currentPage } = usePaginationStore((state) => state);
  const { data, isLoading, isLoadingError } = useQuery<GalleriesWithTrending>({
    queryKey: [QUERY_KEYS.GALLERIES_HOMEPAGE, { page }],
    queryFn: () => {
      return getGalleriesByTag(
        tag ? tag.toLowerCase().replace(" ", "") : "",
        currentPage ? currentPage : Number.isNaN(Number(page)) ? 1 : +page!
      );
    },
    staleTime: import.meta.env.VITE_APP_STALE_TIME,
  });
  return (
    <>
      <section className="flex flex-col gap-y-4">
        {isLoadingError && Navigate({ to: "/error" })}
        {isLoading && !isLoadingError && <Loading />}
        {!isLoading &&
          !isLoadingError &&
          data?.items.map((gallery: Gallery) => (
            <GalleryItem gallery={gallery} key={gallery.title} />
          ))}
      </section>
      <Pagination />
    </>
  );
};

export default GalleriesByTag;
