import clsx from "clsx";

interface CategoryItemProps {
  modelName: string;
  onHandleClick?: (modelName: string) => void;
}

const FavoriteModelItem: React.FC<CategoryItemProps> = ({
  modelName,
  onHandleClick,
}) => {
  const handleClick = (modelName: string) => {
    if (onHandleClick) {
      onHandleClick(modelName);
    }
  };
  return (
    <button
      className={clsx(
        "transition-all duration-300 text-pink-300 hover:text-pink-400 hover:underline"
      )}
      onClick={() => handleClick(modelName)}
    >
      {modelName}
    </button>
  );
};

export default FavoriteModelItem;
