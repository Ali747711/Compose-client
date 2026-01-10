import Swiped from "../../components/Swiper";
import { Product } from "../../../libs/data/types/product";

interface RecomProps {
  products: Product[];
}
const Recommended = (props: RecomProps) => {
  const { products } = props;
  return (
    <div className=" mt-10">
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Recommendations
          </h1>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
      </div>
      <Swiped products={products} />
    </div>
  );
};

export default Recommended;
