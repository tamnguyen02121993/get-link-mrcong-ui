import { createPortal } from "react-dom";
import { FiChevronLeft, FiChevronRight, FiChevronUp } from "react-icons/fi";
import { useCategoriesStore, usePaginationStore } from "../store";
import { useNavigate } from "react-router-dom";

const Pagination = () => {
  const { page, canNext, canPrev, setPage } = usePaginationStore(
    (state) => state
  );
  const { selectedCategory } = useCategoriesStore((state) => state);
  const navigate = useNavigate();
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const handlePreviousPage = () => {
    setPage(page! - 1);
    navigate(`/${selectedCategory?.category}/${page! - 1}`);
  };

  const handleNextPage = () => {
    setPage(page! + 1);
    navigate(`/${selectedCategory?.category}/${page! + 1}`);
  };
  return createPortal(
    <div className="fixed bottom-0 left-0 w-full bg-pink-300 text-white z-50 flex items-center rounded-none shadow-md xl:bottom-5 xl:right-24 xl:w-56 xl:left-[unset] lg:rounded-lg">
      <span className="hidden pr-4 text-3xl font-thin">Page</span>
      <button
        className="xl:basis-1/3 basis-1/4 cursor-pointer hover:bg-pink-400 lg:rounded-lg transition-all duration-300 disabled:hover:bg-pink-300 disabled:cursor-not-allowed"
        onClick={handlePreviousPage}
        disabled={!canPrev}
      >
        <FiChevronLeft size={40} className="mx-auto" />
      </button>
      <span className="text-3xl xl:basis-1/3 basis-1/4 text-center select-none">
        {page}
      </span>
      <button
        className="xl:basis-1/3 basis-1/4 cursor-pointer hover:bg-pink-400 lg:rounded-lg transition-all duration-300 disabled:hover:bg-pink-300 disabled:cursor-not-allowed"
        onClick={handleNextPage}
        disabled={!canNext}
      >
        <FiChevronRight size={40} className="mx-auto" />
      </button>
      <button
        className="xl:hidden basis-1/4 cursor-pointer hover:bg-pink-400 lg:rounded-lg transition-all duration-300"
        onClick={scrollTop}
      >
        <FiChevronUp size={40} className="mx-auto" />
      </button>
    </div>,
    document.querySelector("body")!
  );
};

export default Pagination;
