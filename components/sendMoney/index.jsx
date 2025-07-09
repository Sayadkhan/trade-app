"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


const people = [
  { id: 1, name: "Danielle", avatar: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "Johnatan", avatar: "https://i.pravatar.cc/100?img=2" },
  { id: 3, name: "Alexandra", avatar: "https://i.pravatar.cc/100?img=3" },
  { id: 4, name: "Juanita", avatar: "https://i.pravatar.cc/100?img=4" },
  { id: 5, name: "Daniel", avatar: "https://i.pravatar.cc/100?img=5" },
  { id: 6, name: "Chris", avatar: "https://i.pravatar.cc/100?img=6" },
  { id: 7, name: "Emma", avatar: "https://i.pravatar.cc/100?img=7" },
];

const SendMoney = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 pt-6 pb-8 overflow-x-hidden">
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-semibold">Send Money</span>
        <button className="text-sm text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <Swiper
        loop={true}
        slidesPerGroup={1}
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 3 },
          480: { slidesPerView: 4 },
          640: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
        className="!overflow-visible"
      >
        {people.map((person) => (
          <SwiperSlide key={person.id}>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-4xl overflow-hidden shadow-2xl">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs mt-2 text-gray-700 font-medium truncate w-full">
                {person.name}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SendMoney;
