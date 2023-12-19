import { useNavigate } from "react-router-dom";
import { useCategoriesStore, usePaginationStore } from "../store";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const setSelectedCategory = useCategoriesStore(
    (state) => state.setSelectedCategory
  );
  const setPage = usePaginationStore((state) => state.setPage);
  const handleBackToHome = () => {
    setSelectedCategory(undefined);
    setPage(1);
    navigate("/");
  };
  return (
    <header className="mx-auto my-6">
      <h1
        className="text-5xl font-medium text-pink-300 p-4 border border-dashed border-pink-300 rounded-xl uppercase cursor-pointer"
        onClick={handleBackToHome}
      >
        Beautiful Girls
      </h1>
    </header>
  );
};
export default Header;
