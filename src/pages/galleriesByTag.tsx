import { Navigate, useParams } from "react-router-dom";
import { GalleryItem, Loading, Pagination, TrendingItem } from "../components";
import { useQuery } from "@tanstack/react-query";
import { Gallery, GalleriesWithTrending, Trending } from "../interfaces";
import { QUERY_KEYS } from "../commons";
import { getGalleriesByTag } from "../apis";
import { usePaginationStore } from "../store";
import { useInitData } from "../hooks";
import { PiStarFourBold } from "react-icons/pi";

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
    <div className="flex flex-row flex-wrap md:flex-nowrap gap-4">
      {isLoadingError && Navigate({ to: "/error" })}
      {isLoading && !isLoadingError && <Loading />}
      <section className="flex flex-col gap-y-4 md:flex-grow">
        {!isLoading &&
          !isLoadingError &&
          data?.items.map((gallery: Gallery) => (
            <GalleryItem gallery={gallery} key={gallery.title} />
          ))}
      </section>
      <section className="border-gray-200 pl-4 md:border-l lg:basis-[350px] md:basis-[250px] md:flex-shrink-0">
        {!isLoading && !isLoadingError && (
          <h3 className="font-semibold text-xl text-gray-700 mb-4 flex flex-row items-center gap-x-2">
            <PiStarFourBold />
            <span>Trending</span>
            <PiStarFourBold />
          </h3>
        )}
        <div className="flex flex-col gap-y-4">
          {!isLoading &&
            !isLoadingError &&
            data?.trending.map((trending: Trending) => (
              <TrendingItem {...trending} key={trending.href} />
            ))}
        </div>
      </section>
      <Pagination />
    </div>
  );
};

export default GalleriesByTag;
