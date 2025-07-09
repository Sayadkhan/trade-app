"use client";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaBitcoin } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";

const activities = [
  {
    id: 1,
    icon: <FaGoogle className="text-white" />,
    title: "Google Ads",
    date: "14th March 2025",
    amount: "-$150.55",
    type: "Bill Payment",
    color: "bg-red-500",
  },
  {
    id: 2,
    icon: <FaBitcoin className="text-white" />,
    title: "Bitcoin",
    date: "14th March 2025",
    amount: "+0.315%",
    type: "Stock Update",
    color: "bg-green-500",
  },
  {
    id: 3,
    icon: <FaMoneyCheckAlt className="text-white" />,
    title: "Dividends",
    date: "13th March 2025",
    amount: "$950.00",
    type: "Wire Transfer",
    color: "bg-yellow-500",
  },
];

const RecentActivity = () => {
  return (
    <div className="wrapper flex flex-col gap-5 items-center justify-between px-4 py-4 mt-24 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between w-full">
        <span className="text-lg font-semibold">Recent Activity</span>
        <span className="text-sm text-blue-600 cursor-pointer">View All</span>
      </div>

      <div className="flex flex-col gap-4 w-full bg-white p-4 rounded-xl shadow-lg">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white w-full rounded-xl p-4 shadow-md flex items-center justify-between"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl ${activity.color}`}
            >
              {activity.icon}
            </div>

            <div className="flex-1 ml-4">
              <div className="font-medium">{activity.title}</div>
              <div className="text-sm text-gray-400">{activity.date}</div>
            </div>

            <div className="text-right">
              <div
                className={`text-base font-semibold ${
                  activity.amount.includes("-")
                    ? "text-red-500"
                    : activity.amount.includes("%")
                    ? "text-blue-500"
                    : "text-green-600"
                }`}
              >
                {activity.amount}
              </div>
              <div className="text-sm text-gray-400">{activity.type}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
