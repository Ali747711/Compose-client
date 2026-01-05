import ProductCard from "../../components/ProductCard";

// Import required Swiper modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Icons
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { retrievePopularDishes } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const PopularDishRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({
    popularDishes,
  })
);

const BestSeller = () => {
  const { popularDishes } = useSelector(PopularDishRetriever);
  // console.log("Popular dishes: ", popularDishes);

  return (
    <div className="mt-16">
      <p className="text-2xl text-main-text md:text-3xl font-medium">
        Best Seller
      </p>
      <div className="hidden md:flex relative mt-6 gap-6">
        <Swiper
          modules={[Pagination, A11y, Scrollbar, Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={6}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="relative"
        >
          {popularDishes.map((product, i) => (
            <SwiperSlide>
              <ProductCard key={i} product={product} />
            </SwiperSlide>
          ))}
          <NavigationButtons />
        </Swiper>
      </div>
      {/* Mobile Carousel - Hidden on desktop */}
      <div className="md:hidden mb-6 mt-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={1}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="rounded-2xl hero-swiper"
        >
          {popularDishes.map((product, index) => (
            <div className="h-48 bg-gray-200 rounded-2xl overflow-hidden">
              <SwiperSlide key={index}>
                <div className="w-full h-full">
                  <ProductCard key={index} product={product} />
                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BestSeller;

const NavigationButtons = () => {
  // Swiper BUTTONS
  const swiper = useSwiper();

  return (
    <div className="flex gap-4">
      <button
        className="hover:bg-main/10 cursor-pointer w-10 h-10 rounded-full flex justify-center items-center"
        onClick={() => swiper.slidePrev()}
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={25} />
      </button>

      <button
        onClick={() => swiper.slideNext()}
        className="hover:bg-main/10 cursor-pointer w-10 h-10 rounded-full flex justify-center items-center"
      >
        <HugeiconsIcon icon={ArrowRight01Icon} size={25} />
      </button>
    </div>
  );
};
