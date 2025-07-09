"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import Image from "next/image";
import "./styles.css";

const cards = [
  {
    id: 1,
    image: "/cards/image_1.jpg",
    number: "1234 5678 1234 5661",
    expiry: "08 / 25",
    balance: "$10,250.00",
    label: "Savings Account",
  },
  {
    id: 2,
    image: "/cards/image_2.jpg",
    number: "9876 5432 1098 7654",
    expiry: "11 / 26",
    balance: "$5,250.00",
    label: "Business Account",
  },
];

export default function CardHero() {
  return (
    <div className="flex justify-center">
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards]}
        className="w-[90%] md:w-[520px] lg:w-[600px] h-[240px] md:h-[320px] lg:h-[360px]"
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={card.image}
                alt={`Card ${card.id}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm p-5 text-white flex flex-col justify-between rounded-2xl">
                <div className="text-sm opacity-90">{card.label}</div>
                <div className="text-xl md:text-2xl tracking-widest font-mono">
                  {card.number}
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Exp: {card.expiry}</span>
                  <span className="font-semibold">{card.balance}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
