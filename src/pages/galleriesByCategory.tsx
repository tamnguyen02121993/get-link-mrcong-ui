import { useQuery } from "@tanstack/react-query";
import { GalleriesWithTrending, Gallery, Trending } from "../interfaces";
import { QUERY_KEYS } from "../commons/keys";
import { getGalleriesByCategory } from "../apis";
import { Navigate, useParams } from "react-router-dom";
import { PiStarFourBold } from "react-icons/pi";
import { GalleryItem, Loading, Pagination, TrendingItem } from "../components";
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
      <div className="flex flex-row flex-wrap md:flex-nowrap gap-4">
        {isLoadingError && Navigate({ to: "/error" })}
        {isLoading && !isLoadingError && <Loading />}
        <section className="flex flex-col gap-y-4 md:flex-grow">
          {selectedCategory &&
            !isLoading &&
            !isLoadingError &&
            data?.items.map((gallery: Gallery) => (
              <GalleryItem gallery={gallery} key={gallery.title} />
            ))}
        </section>
        <section className="border-gray-200 pl-4 md:border-l lg:basis-[350px] md:basis-[250px] md:flex-shrink-0">
          <h3 className="font-semibold text-xl text-gray-700 mb-4 flex flex-row items-center gap-x-2">
            <PiStarFourBold />
            <span>Trending</span>
            <PiStarFourBold />
          </h3>
          <div className="flex flex-col gap-y-4">
            {selectedCategory &&
              !isLoading &&
              !isLoadingError &&
              data?.trending.map((trending: Trending) => (
                <TrendingItem {...trending} key={trending.href} />
              ))}
          </div>
        </section>
      </div>
      {selectedCategory && <Pagination />}
    </>
  );
};

export default Galleries;
