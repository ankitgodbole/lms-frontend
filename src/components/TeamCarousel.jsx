// components/TeamCarousel.jsx
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { TEAM_MEMBER } from "../Constatnts/TeamMemeberData.js";

export default function TeamCarousel() {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      autoplay={{ delay: 3500 }}
      pagination={{ clickable: true }}
      className="w-full max-w-md mx-auto"
    >
      {TEAM_MEMBER.map((member, index) => {
        console.log(member.img);
        return (
          <SwiperSlide pagination={{ clickable: true }} key={index}>
            <div className=" rounded-2xl p-6 text-center   text-white">
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-yellow-400"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-yellow-400 mb-3">{member.role}</p>
              <p className="text-gray-300 italic text-sm">"{member.quote}"</p>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
