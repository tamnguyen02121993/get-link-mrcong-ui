import { Link } from "react-router-dom";
import { FiTag } from "react-icons/fi";
import { FaRegImages } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Gallery, Tag } from "../interfaces";

interface GalleryItemProps {
  gallery: Gallery;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ gallery }) => {
  return (
    <section className="flex flex-col items-start border-b border-gray-200">
      <div className="md:flex-shrink-0 cursor-pointer overflow-hidden rounded-xl">
        <Link to={`/detail?link=${gallery.href}`} title={gallery.title}>
          <img
            src={gallery.coverImage}
            alt={gallery.coverImage}
            className="object-cover transition-all duration-300 hover:scale-[1.15] rounded-xl"
          />
        </Link>
      </div>
      <div className="flex-grow p-4 flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <h3 className="font-semibold text-xl text-gray-700 flex flex-row items-center gap-x-2">
            <FaRegImages /> <span>Gallery Name</span>
          </h3>
          <Link to={`/detail?link=${gallery.href}`}>
            <p className="text-gray-700 hover:text-pink-300">{gallery.title}</p>
          </Link>
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="font-semibold text-xl text-gray-700 flex flex-row items-center gap-x-2">
            <HiOutlineExternalLink />
            <span>Original Link</span>
          </h3>
          <Link to={gallery.href} target="_blank">
            <p className="text-gray-700 hover:text-pink-300">{gallery.href}</p>
          </Link>
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="font-semibold text-xl text-gray-700 flex flex-row items-center gap-x-2">
            <FiTag /> <span>Tags</span>
          </h3>
          <div className="flex flex-row flex-wrap gap-2">
            {gallery.tags.map((x: Tag) => (
              <Link
                to={`/tag/${x.tagName.toLowerCase().replace(/ /g, "-")}/page/1`}
                key={x.tagName}
                className="px-4 py-2 border rounded-lg transition-all duration-300 text-pink-300 hover:text-white hover:bg-pink-300"
              >
                <p>{x.tagName}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryItem;
