import { ReviewCard } from "./components/ReviewCard";
import Masonry from "react-layout-masonry";

export function Search() {
  const imgPath = [
    { id: 1, title: "Nice to meet you!", src: "src/assets/placeholder/1.jpeg" },
    { id: 2, title: "Nice to meet you!" },
    { id: 3, title: "Nice to meet you!" },
    { id: 4, title: "Nice to meet you!", src: "src/assets/placeholder/2.jpeg" },
    { id: 5, title: "Nice to meet you!", src: "src/assets/placeholder/3.jpeg" },
    { id: 6, title: "Nice to meet you!" },
    { id: 7, title: "Nice to meet you!", src: "src/assets/placeholder/4.jpeg" },
    { id: 8, title: "Nice to meet you!" },
    { id: 9, title: "Nice to meet you!", src: "src/assets/placeholder/5.jpeg" },
    { id: 8, title: "Nice to meet you!" },
    {
      id: 10,
      title: "Nice to meet you!",
      src: "src/assets/placeholder/6.jpeg",
    },
    { id: 11, title: "Nice to meet you!" },
  ];

  return (
    <div>
      <Masonry
        columns={{ 300: 2, 640: 3, 768: 4, 1024: 5, 1280: 6 }}
        gap={2}
        columnProps={{ style: { marginTop: "2rem" } }}
      >
        {imgPath.map((obj) => (
          <ReviewCard id={obj.id} imgPath={obj.src} title={obj.title} />
        ))}
      </Masonry>
    </div>
  );
}
