import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "../../../css/swiper-custom.css";
import "swiper/css/pagination";

// Dummy data
const heroImages = [
  "https://res.cloudinary.com/dmenptrzv/image/upload/v1768753764/pexels-public-domain-pictures-41199_bbcusv.jpg",
  "https://res.cloudinary.com/dmenptrzv/image/upload/v1768753764/pexels-userpascal-32488208_j8nrul.jpg",
  "https://res.cloudinary.com/dmenptrzv/image/upload/v1768753764/pexels-andrew-4264047_kdmvqj.jpg",
  "https://res.cloudinary.com/dmenptrzv/image/upload/v1768753764/pexels-gu-ko-2150570603-31767942_s1ygyz.jpg",
  "https://res.cloudinary.com/dmenptrzv/image/upload/v1768753764/pexels-eldisculpe-34083022_p5hwel.jpg",
  "https://res.cloudinary.com/dmenptrzv/image/upload/v1768753764/pexels-public-domain-pictures-41199_bbcusv.jpg",
];

const HeroSection = () => {
  return (
    <div className="w-full  py-8 md:py-12 ">
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

          {/* Bottom row - 2 larger images */}
          <div className="col-span-1 h-90 bg-gray-200 rounded-2xl overflow-hidden">
            <img
              src={heroImages[3]}
              alt="Product 4"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="col-span-2 h-90 bg-gray-200 rounded-2xl overflow-hidden">
            <img
              src={heroImages[4]}
              alt="Product 5"
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

        {/* Category Badges */}
      </div>
    </div>
  );
};

export default HeroSection;
