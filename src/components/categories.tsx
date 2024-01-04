import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { QUERY_KEYS } from "../commons";
import { getCategories } from "../apis";
import { Category } from "../interfaces";
import { Loading, CategoryItem } from ".";
import { useCategoriesStore, usePaginationStore } from "../store";

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory } = useCategoriesStore(
    (state) => state
  );
  const { setPage } = usePaginationStore((state) => state);
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: getCategories,
    staleTime: import.meta.env.VITE_APP_STALE_TIME,
  });

  const handleClick = (cat: Category) => {
    setSelectedCategory(cat);
    setPage(1);
    if (cat) {
      navigate(`/category/${cat.category.toLowerCase()}/page/1`);
    }
  };
  return (
    <section className="flex flex-row flex-wrap gap-2">
      {isLoading && <Loading />}
      {!isLoading &&
        categories.map((category: Category) => (
          <CategoryItem
            category={category}
            selected={selectedCategory?.category === category.category}
            onHandleClick={handleClick}
            key={category.href}
          />
        ))}
    </section>
  );
};

export default Categories;
