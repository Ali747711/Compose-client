// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import type { Product } from "../../libs/data/types/product";
import ProductCard from "./ProductCard";

const Swiped = ({ products }: { products: Product[] }) => {
  return (
    <div>
      <div className="hidden md:flex">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={150}
          slidesPerView={4}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
        >
          {products.map((product, i) => (
            <div>
              <SwiperSlide key={i}>
                <ProductCard product={product} />
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
      <div className="md:hidden mt-5">
        <Swiper
          modules={[Pagination, Navigation, A11y, Autoplay]}
          spaceBetween={1}
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {products.map((product, i) => (
            <SwiperSlide key={i}>
              <div className="w-full h-full">
                <ProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default Swiped;
