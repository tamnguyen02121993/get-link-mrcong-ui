import { useQuery } from "@tanstack/react-query";
import { GalleriesWithTrending, Gallery } from "../interfaces";
import { QUERY_KEYS } from "../commons/keys";
import { getGalleriesByCategory } from "../apis";
import { Navigate, useParams } from "react-router-dom";
import { GalleryItem, Loading, Pagination } from "../components";
import { useCategoriesStore, usePaginationStore } from "../store";
import { useInitData } from "../hooks";

const Galleries: React.FC = () => {
  useInitData();

  const { category, page } = useParams();
  const { selectedCategory } = useCategoriesStore((state) => state);
  const { page: currentPage } = usePaginationStore((state) => state);

  const { data, isLoading, isLoadingError } = useQuery<GalleriesWithTrending>({
    queryKey: [QUERY_KEYS.GALLERIES, { category, page }],
    queryFn: () =>
      getGalleriesByCategory(
        selectedCategory ? selectedCategory.category : category!,
        currentPage ? currentPage : Number.isNaN(Number(page)) ? 1 : +page!
      ),
    staleTime: import.meta.env.VITE_APP_STALE_TIME,
  });
  return (
    <>
      <section className="flex flex-col gap-y-4">
        {isLoadingError && Navigate({ to: "/error" })}
        {isLoading && !isLoadingError && <Loading />}
        {selectedCategory &&
          !isLoading &&
          !isLoadingError &&
          data?.items.map((gallery: Gallery) => (
            <GalleryItem gallery={gallery} key={gallery.title} />
          ))}
      </section>
      {selectedCategory && <Pagination />}
    </>
  );
};

export default Galleries;
