import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { QUERY_KEYS } from "../commons";
import { getFavoriteModels } from "../apis";
import { Loading, FavoriteModelItem } from ".";

const FavoriteModels: React.FC = () => {
  const navigate = useNavigate();
  const { data: models = [], isLoading } = useQuery<string[]>({
    queryKey: [QUERY_KEYS.FAVORITE_MODELS],
    queryFn: getFavoriteModels,
    staleTime: import.meta.env.VITE_APP_STALE_TIME,
  });

  const handleClick = (modelName: string) => {
    if (modelName) {
      navigate(`/tag/${modelName.toLowerCase().replace(/ /g, "-")}/page/1`);
    }
  };
  return (
    <section className="flex flex-row flex-wrap gap-2">
      {isLoading && <Loading />}
      {!isLoading &&
        models.map((model: string) => (
          <FavoriteModelItem
            modelName={model}
            onHandleClick={handleClick}
            key={model}
          />
        ))}
    </section>
  );
};

export default FavoriteModels;
