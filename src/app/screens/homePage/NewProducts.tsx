// Import required Swiper modules
import { createSelector } from "@reduxjs/toolkit";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { retrieveNewDishes } from "./selector";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

const NewDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

const NewProducts = () => {
  const { newDishes } = useSelector(NewDishesRetriever);
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">New Products</p>
      <div className="hidden md:flex">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay, Scrollbar]}
          spaceBetween={10}
          slidesPerView={6}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          className="relative"
        >
          {newDishes.map((product, i) => (
            <div
              key={i}
              className="h-48 bg-gray-200 rounded-2xl overflow-hidden"
            >
              <SwiperSlide key={i}>
                <ProductCard product={product} />
              </SwiperSlide>
              <NavigationButtons />
            </div>
          ))}
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
          {newDishes.map((product, index) => (
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

export default NewProducts;
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
