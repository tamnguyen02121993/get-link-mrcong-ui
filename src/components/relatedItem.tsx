import { Link, useNavigate } from "react-router-dom";

interface RelatedItemProps {
  href: string;
  title: string;
  img: {
    src: string;
    srcSet: string;
  };
}

const RelatedItem: React.FC<RelatedItemProps> = ({
  img: { src, srcSet },
  href,
  title,
}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/detail?link=${href}`);
  };
  return (
    <div className="flex flex-col gap-2 basis-[100%] md:basis-[48%] lg:basis-[32%]">
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
      <h4
        className="text-pink-300 hover:text-pink-400 transition-all duration-300 cursor-pointer"
        onClick={handleNavigate}
      >
        {title}
      </h4>
    </div>
  );
};

export default RelatedItem;
