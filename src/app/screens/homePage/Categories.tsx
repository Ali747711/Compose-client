import { categories } from "../../../libs/data/category";
import { useNavigate } from "react-router-dom";
const Categories = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2  md:flex gap-3 justify-self-center md:gap-4">
      {categories.map((category) => (
        <button
          onClick={() => {
            navigate(`/products/${category.collection.toLowerCase()}`);
            scrollTo(0, 0);
          }}
          key={category.id}
          className={`${category.color} rounded-full px-3 py-2 md:px-4 md:py-2 flex items-center justify-center md:justify-start gap-2 hover:shadow-lg shadow-main/50 transition-shadow duration-200`}
        >
          <span className="text-xl md:text-2xl">
            <img src={category.path} alt={category.name} className="h-10 w-8" />
          </span>
          <span className="inline text-sm font-medium text-main-text">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Categories;
