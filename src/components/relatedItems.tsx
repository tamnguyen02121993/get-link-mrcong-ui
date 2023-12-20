import { RelatedItem } from ".";
import { RelatedGallery } from "../interfaces";

interface RelatedItemsProps {
  galleries: RelatedGallery[];
}

const RelatedItems: React.FC<RelatedItemsProps> = ({ galleries }) => {
  return (
    <section className="flex flex-wrap flex-row gap-4">
      {galleries.map((x) => (
        <RelatedItem href={x.url} img={x.img} title={x.title} key={x.url} />
      ))}
    </section>
  );
};

export default RelatedItems;
