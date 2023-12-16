import { useParams } from "react-router-dom";
import { useCategoriesStore, usePaginationStore } from "../store";

const useInitData = () => {
  const { category, page } = useParams();
  const { selectedCategory, setSelectedCategory } = useCategoriesStore(
    (state) => state
  );
  const { setPage } = usePaginationStore((state) => state);
  if (!selectedCategory) {
    setSelectedCategory({
      category: category!,
      href: "",
      name: "",
    });

    setPage(Number.isNaN(page) ? 1 : +page!);
  }
};

export default useInitData;
