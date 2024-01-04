import clsx from "clsx";
import { Category } from "../interfaces";

interface CategoryItemProps {
  category: Category;
  selected: boolean;
  onHandleClick?: (category: Category) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  selected,
  onHandleClick,
}) => {
  const handleClick = (_category: Category) => {
    if (onHandleClick) {
      onHandleClick(_category);
    }
  };
  return (
    <button
      className={clsx(
        "border border-gray-200 rounded-lg shadow-sm px-6 py-4 transition-all duration-300 hover:bg-pink-300 hover:text-white",
        selected ? "bg-pink-300 text-white" : "bg-white text-pink-300"
      )}
      onClick={() => handleClick(category)}
    >
      {category.name}
    </button>
  );
};

export default CategoryItem;
