import { Link } from "react-router-dom";

interface TrendingItemProps {
  href: string;
  title: string;
  img: {
    src: string;
    srcSet: string;
  };
}
const TrendingItem: React.FC<TrendingItemProps> = ({
  href,
  title,
  img: { src, srcSet },
}) => {
  return (
    <Link
      to={`/detail?link=${href}`}
      title={title}
      className="cursor-pointer overflow-hidden rounded-xl"
    >
      <img
        src={src}
        srcSet={srcSet}
        alt={title}
        className="w-full h-auto object-cover transition-all duration-300 hover:scale-[1.15] rounded-xl"
      />
    </Link>
  );
};

export default TrendingItem;
