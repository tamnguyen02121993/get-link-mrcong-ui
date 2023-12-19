import { useParams } from "react-router-dom";
import { useCategoriesStore, usePaginationStore, useTagStore } from "../store";
import { useEffect } from "react";

const useInitData = () => {
  const { category, page, tag } = useParams();
  const { selectedCategory, setSelectedCategory } = useCategoriesStore(
    (state) => state
  );
  const { selectedTag, setSelectedTag } = useTagStore((state) => state);
  const { page: currentPage, setPage } = usePaginationStore((state) => state);
  useEffect(() => {
    if (!selectedCategory) {
      setSelectedCategory({
        category: category!,
        href: "",
        name: "",
      });
    }

    if (!selectedTag) {
      setSelectedTag({
        tagHref: "",
        tagName: tag!,
      });
    }
    if (!currentPage) {
      setPage(Number.isNaN(Number(page)) ? 1 : +page!);
    }
  }, []);
};

export default useInitData;
