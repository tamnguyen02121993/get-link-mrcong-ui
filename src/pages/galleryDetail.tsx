import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
// import { useState } from "react";
// import Lightbox from "react-image-lightbox";
import { FiChevronLeft, FiTag } from "react-icons/fi";
import { FiLink } from "react-icons/fi";
import { getGalleryDetail, getRelatedGalleries } from "../apis";
import { QUERY_KEYS } from "../commons";
import { GalleryDetail, RelatedGallery, Tag } from "../interfaces";
import { Loading, RelatedItems } from "../components";
const GalleryDetailComp: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const {
    data: galleryDetail,
    isLoading,
    isLoadingError,
  } = useQuery<GalleryDetail>({
    queryKey: [QUERY_KEYS.GALLERY_DETAIL, { link: params.get("link") }],
    queryFn: () => getGalleryDetail(params.get("link") || ""),
    staleTime: import.meta.env.VITE_APP_STALE_TIME,
  });

  const {
    data: relatedItems,
    isLoading: isLoadingRelatedItems,
    isLoadingError: isLoadingErrorRelatedItems,
  } = useQuery<RelatedGallery[]>({
    queryKey: [QUERY_KEYS.GALLERIES_RELATED, { link: params.get("link") }],
    queryFn: () => getRelatedGalleries(params.get("link") || ""),
    staleTime: import.meta.env.VITE_APP_STALE_TIME,
  });
  // const [isOpen, setIsOpen] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const handleOnClick = (src: string) => {
  //   setIsOpen(true);
  //   const index = galleryDetail?.imageList.findIndex((x) => x === src);
  //   setCurrentIndex(index!);
  // };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      {!isLoading && !isLoadingError && (
        <button
          className={
            "mb-4 border border-gray-200 rounded-lg shadow-sm py-2 px-4 transition-all duration-300 bg-pink-300 text-white hover:bg-pink-400 inline-flex flex-row justify-between items-center"
          }
          onClick={handleBack}
        >
          <FiChevronLeft /> <span>Back</span>
        </button>
      )}
      <section className="flex flex-col gap-y-4">
        {isLoadingError && Navigate({ to: "/error" })}
        {isLoading && !isLoadingError && <Loading />}
        {!isLoading && !isLoadingError && galleryDetail && (
          <>
            <div className="flex flex-col gap-y-4 [&>*:nth-child(6):hover]:text-pink-300 [&>*:nth-child(6):hover]:cursor-pointer">
              {galleryDetail.info.map((x) => (
                <div className="text-xl break-words" key={x}>
                  {x}
                </div>
              ))}

              <div className="text-xl">
                <span>Original Download Link: </span>
                <Link
                  to={galleryDetail.downloadLink.originalLink}
                  target="_blank"
                  className="transition-all duration-300 hover:text-pink-300"
                >
                  {galleryDetail.downloadLink.originalLink}
                </Link>
              </div>
              <div className="text-xl">
                <span>Converted Download Link: </span>
                <div className="break-words">
                  <Link
                    to={galleryDetail.downloadLink.convertedLink}
                    target="_blank"
                    className="transition-all duration-300 hover:text-pink-300"
                  >
                    {galleryDetail.downloadLink.convertedLink}
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <h3 className="font-semibold text-xl text-gray-700 flex flex-row items-center gap-x-2">
                  <FiTag /> <span>Tags</span>
                </h3>
                <div className="flex flex-row flex-wrap gap-2">
                  {galleryDetail.tags.map((x: Tag) => (
                    <Link
                      to={`/tag/${x.tagName
                        .toLowerCase()
                        .replace(/ /g, "-")}/page/1`}
                      key={x.tagName}
                      className="px-4 py-2 border rounded-lg transition-all duration-300 text-pink-300 hover:text-white hover:bg-pink-300"
                    >
                      <p>{x.tagName}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="gap-4 columns-1 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8">
              {galleryDetail.imageList.map((x) => (
                <picture key={x}>
                  <source src={x} type="image/webp"></source>
                  <img
                    src={x}
                    alt={x}
                    className="object-cover rounded-lg cursor-pointer"
                    // onClick={() => handleOnClick(x)}
                  />
                </picture>
              ))}
            </div>

            {/* {isOpen && galleryDetail && (
              <Lightbox
                enableZoom
                mainSrc={galleryDetail.imageList[currentIndex]}
                nextSrc={
                  galleryDetail.imageList[
                    currentIndex + 1 >= galleryDetail.imageList.length
                      ? 0
                      : currentIndex + 1
                  ]
                }
                prevSrc={
                  galleryDetail.imageList[
                    currentIndex - 1 < 0
                      ? galleryDetail.imageList.length - 1
                      : currentIndex - 1
                  ]
                }
                onCloseRequest={() => setIsOpen(false)}
                onMovePrevRequest={() =>
                  setCurrentIndex(
                    currentIndex - 1 < 0
                      ? galleryDetail.imageList.length - 1
                      : currentIndex - 1
                  )
                }
                onMoveNextRequest={() =>
                  setCurrentIndex(
                    currentIndex + 1 >= galleryDetail.imageList.length
                      ? 0
                      : currentIndex + 1
                  )
                }
              />
            )} */}
          </>
        )}
      </section>

      <section className="mt-4">
        <h3 className="font-semibold text-xl text-gray-700 mb-4 flex flex-row items-center gap-x-2">
          <FiLink />
          <span>Related</span>
        </h3>
        <hr className="my-4" />
        {!isLoadingRelatedItems &&
          !isLoadingErrorRelatedItems &&
          relatedItems && <RelatedItems galleries={relatedItems} />}
      </section>
    </>
  );
};

export default GalleryDetailComp;
