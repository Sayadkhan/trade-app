"use client";

import { InputField } from "@/components/inputFileds";
import Navbar from "@/components/navbar/navbar";
import Slider from "@/components/slider/slider";

import { CiCircleChevUp } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";
import { RiExchangeFundsLine } from "react-icons/ri";
import { FaMoneyBills } from "react-icons/fa6";
import RecentActivity from "@/components/recentActivity";
import SendMoney from "@/components/sendMoney";
import { useState } from "react";
import TransferModal from "@/components/TransferModal/TransferModal";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import fetchDashboard from "@/actions/dashboard";
import Market from "@/features/Market";

export default function Home() {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });

  console.log(data?.cash_flow_statistics);

  const actions = [
    {
      id: 1,
      label: "Investment",
      icon: <CiCircleChevUp size={48} className="text-green-500" />,
      // action: () => setIsTransferModalOpen(true),
      link: "/investment",
    },
    {
      id: 2,
      label: "Trading",
      icon: <CiCircleChevDown size={48} className="text-red-500" />,
      link: "/trading",
    },
    {
      id: 3,
      label: "Matrix",
      icon: <RiExchangeFundsLine size={48} className="text-blue-500" />,
      link: "/matrix",
    },
    {
      id: 4,
      label: "Wallets",
      icon: <FaMoneyBills size={48} className="text-yellow-500" />,
      link: "/wallets",
    },
  ];
  return (
    <div className="bg-[#EFEEF3] min-h-screen relative">
      <div className="relative bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 text-white pb-[60px] ">
        <Navbar />
        <div className="wrapper">
          <Slider data={data?.cash_flow_statistics} />
        </div>

        {/* Concave curve at the bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg
            className="relative block w-[calc(100%+1.3px)] h-[60px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.81,22,103.39,29.05,158,17.63
        C230.67,50.14,284.44,11.2,339,6.7
        c54.17-4.44,104.06,26.57,158,39.17
        c70.5,16.48,136.74,2.7,202-18.65
        c60.72-20.16,121.28-46.55,182-30.52
        C943.61,17.81,1003.79,62.6,1062,75.73
        c55.76,12.5,113.18-6.3,138-20.8V0Z"
              fill="#EFEEF3"
            />
          </svg>
        </div>

        <div className="wrapper flex items-center justify-evenly px-4 py-8 flex-wrap gap-4 absolute bottom-[-100] left-0 right-0">
          {actions.map((action) => (
            <div
              key={action.id}
              onClick={action.action}
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 w-18 h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg">
                {action.link ? (
                  <Link
                    href={action.link}
                    className="flex items-center justify-center h-full"
                  >
                    {action.icon}
                  </Link>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    {action.icon}
                  </div>
                )}
              </div>
              <div className="text-center text-gray-500 mt-2 text-xl">
                {action.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity  */}
      <div className="wrapper mt-10">
        <Market />
      </div>

      {/* send Money */}
      <div className="mb-40">
        <SendMoney />
      </div>
      {isTransferModalOpen && (
        <TransferModal
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
        />
      )}
    </div>
  );
}
