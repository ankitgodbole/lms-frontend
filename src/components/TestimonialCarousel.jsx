import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
  {
    name: "Amit Sharma",
    college: "IIIT Bhopal",
    feedback: "CrackCampus helped me crack my first internship!",
    image: "/images/amit.jpg",
  },
  {
    name: "Priya Verma",
    college: "RGPV University",
    feedback: "The mock tests and DSA roadmap are brilliant!",
    image: "/images/priya.jpg",
  },
  // Add more testimonials if needed
];

function TestimonialCarousel() {
  return (
    <section className="py-16 px-4 sm:px-6 md:px-10 bg-gradient-to-b from-[#3d55669e] via-gray-50 to-[#3d55669e]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Hear From Our Students
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-10">
          Real stories from learners who leveled up with CrackCampus.
        </p>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 1,
            },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-10 max-w-3xl mx-auto transition-all duration-300 hover:shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400 mb-4"
                  />
                  <blockquote className="text-gray-700 italic text-lg leading-relaxed">
                    “{item.feedback}”
                  </blockquote>
                  <div className="mt-4">
                    <h4 className="text-xl font-semibold text-gray-900">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">{item.college}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default TestimonialCarousel;
