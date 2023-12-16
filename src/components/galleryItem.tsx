import { Link } from "react-router-dom";
import { Gallery } from "../interfaces";
import { useCategoriesStore, usePaginationStore } from "../store";

interface GalleryItemProps {
  gallery: Gallery;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ gallery }) => {
  const { selectedCategory } = useCategoriesStore((state) => state);
  const { page: currentPage } = usePaginationStore((state) => state);
  return (
    <section className="flex flex-col lg:flex-row items-start">
      <div className="md:flex-shrink-0 cursor-pointer overflow-hidden rounded-xl">
        <Link
          to={`/${selectedCategory?.category}/${currentPage}/detail?link=${gallery.href}`}
        >
          <img
            src={gallery.coverImage}
            alt={gallery.coverImage}
            className="object-cover transition-all duration-300 hover:scale-[1.15] rounded-xl"
          />
        </Link>
      </div>
      <div className="flex-grow p-4 flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4">
          <h3 className="font-semibold text-xl text-gray-700">Gallery Name</h3>
          <Link
            to={`/${selectedCategory?.category}/${currentPage}/detail?link=${gallery.href}`}
          >
            <p className="text-gray-700 hover:text-pink-300">{gallery.title}</p>
          </Link>
        </div>
        <div className="flex flex-col gap-y-4">
          <h3 className="font-semibold text-xl text-gray-700">Original Link</h3>
          <Link to={gallery.href} target="_blank">
            <p className="text-gray-700 hover:text-pink-300">{gallery.href}</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryItem;
