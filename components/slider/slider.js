"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { HiDotsHorizontal } from "react-icons/hi";

export default function Slider({ data }) {
  const [balances, setBalances] = useState({});

  const depositData = data?.deposit || {};

  const cards = Object.entries(depositData)
    .filter(([key]) => key !== "total")
    .map(([key, value], index) => ({
      id: index + 1,
      image: `/cards/image_${index + 1}.jpg`,
      number: "•••• •••• •••• ••••",
      expiry: "N/A",
      balance: `$${value.amount}`,
      label: `${key.charAt(0).toUpperCase() + key.slice(1)} Account`,
    }));

  const toggleBalance = (id) => {
    setBalances((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={20}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {cards.map((card) => {
        const isOpen = balances[card.id];
        return (
          <SwiperSlide key={card.id}>
            <div
              className="w-full h-60 md:h-96 lg:h-[40rem] rounded-2xl p-8 overflow-hidden shadow-xl relative bg-cover bg-center transition-transform duration-300"
              style={{ backgroundImage: `url(${card.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 bg-opacity-30 z-10 rounded-2xl"></div>

              {/* Content */}
              <div className="z-20 flex flex-col justify-between h-full relative text-white">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{card.label}</div>
                  <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-lg">
                    <HiDotsHorizontal className="text-2xl cursor-pointer text-black" />
                  </div>
                </div>

                {/* Balance Section */}
                <div className="relative mt-4 w-max">
                  <button
                    onClick={() => toggleBalance(card.id)}
                    className="bg-white text-black px-4 py-2 rounded shadow text-xs font-medium z-30 relative flex items-center gap-2 transition-all duration-300"
                  >
                    <span>{isOpen ? "Hide Balance" : "Click for Balance"}</span>
                    <span
                      className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out text-sm font-semibold ${
                        isOpen
                          ? "max-w-[120px] opacity-100 ml-2"
                          : "max-w-0 opacity-0 ml-0"
                      }`}
                    >
                      {card.balance}
                    </span>
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="mt-6 text-lg tracking-widest font-mono">
                    {card.number}
                  </div>
                  <div className="text-sm font-semibold">{card.expiry}</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
