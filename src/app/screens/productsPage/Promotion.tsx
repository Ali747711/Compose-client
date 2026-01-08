import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "../../../css/swiper-custom.css";
import "swiper/css/pagination";

// Dummy data
const heroImages = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
  "https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?w=800",
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800",
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
];

const Promotion = () => {
  return (
    <div className="w-full py-8 md:py-12">
      <div className="w-full mx-auto px-4">
        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 mb-8">
          {/* Top row - 3 images */}
          <div className="col-span-1 h-75 bg-gray-200 rounded-2xl overflow-hidden">
            <img
              src={heroImages[0]}
              alt="Product 1"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="col-span-1 h-75 bg-gray-200 rounded-2xl overflow-hidden">
            <img
              src={heroImages[1]}
              alt="Product 2"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="col-span-1 h-75 bg-gray-200 rounded-2xl overflow-hidden">
            <img
              src={heroImages[2]}
              alt="Product 3"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Mobile Carousel - Hidden on desktop */}
        <div className="md:hidden mb-6">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={16}
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
            {heroImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="h-48 bg-gray-200 rounded-2xl overflow-hidden">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
