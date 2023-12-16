import { useNavigate, useRouteError } from "react-router-dom";
import { useCategoriesStore, usePaginationStore } from "../store";

const Error: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const { setSelectedCategory } = useCategoriesStore((state) => state);
  const { setPage } = usePaginationStore((state) => state);

  const handleBackToHomePage = () => {
    setSelectedCategory(undefined);
    setPage(undefined);
    navigate("/");
  };
  return (
    <div className="flex flex-col justify-center items-center gap-y-4">
      <h1 className="text-gray-700 text-3xl">Oops!</h1>
      <p>Sorry, Something went wrong!.</p>
      <button
        className={`
          border border-gray-200 rounded-lg shadow-sm px-6 py-4 transition-all duration-300
          bg-pink-300 text-white hover:bg-pink-400`}
        onClick={handleBackToHomePage}
      >
        Back to Homepage
      </button>
    </div>
  );
};

export default Error;
