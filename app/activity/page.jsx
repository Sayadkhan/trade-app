"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar/navbar";
import { CheckCircle, Lock, DollarSign } from "lucide-react";
import BottomMenu from "@/components/menutab";

const tabs = ["Recent", "Transfers", "Payments"];

const data = {
  Recent: [
    {
      title: "Karla Black",
      date: "12th March 2025",
      amount: "+$150.55",
      status: "Received",
      color: "text-green-500",
      avatar: "https://i.pravatar.cc/100", // replace with actual image
    },
    {
      title: "Withdrawal",
      date: "12th March 2025",
      amount: "$345.31",
      status: "Main Account",
      color: "text-blue-500",
      avatar: "https://i.pravatar.cc/100",
    },
    {
      title: "Google Ads",
      date: "14th March 2025",
      amount: "-$324.55",
      status: "Bill Payment",
      color: "text-red-500",
      avatar: "https://i.pravatar.cc/100",
    },
    {
      title: "Google Ads",
      date: "14th March 2025",
      amount: "-$324.55",
      status: "Bill Payment",
      color: "text-red-500",
      avatar: "https://i.pravatar.cc/100",
    },
    {
      title: "Google Ads",
      date: "14th March 2025",
      amount: "-$324.55",
      status: "Bill Payment",
      color: "text-red-500",
      avatar: "https://i.pravatar.cc/100",
    },
  ],
  Transfers: [
    {
      title: "Karla Black",
      date: "Awaiting Approval",
      badge: "DETAILS",
      badgeColor: "bg-green-500",
      icon: <CheckCircle className="text-green-500" />,
    },
  ],
  Payments: [
    {
      title: "Verification",
      date: "Action Required",
      badge: "VERIFY",
      badgeColor: "bg-blue-500",
      icon: <Lock className="text-blue-500" />,
    },
  ],
};

export default function Page() {
  const [activeTab, setActiveTab] = useState("Recent");

  return (
    <div className="wrapper min-h-screen ">
      <Navbar />

        <div className="bg-white p-4 mt-5 shadow-2xl rounded-2xl mb-40">
          {/* Tabs */}
              <div className="flex items-center justify-between bg-[#EFEEF3]  p-2 rounded-full mx-4 mt-4 shadow-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                      activeTab === tab
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Transaction List */}
              <div className="mt-4 px-4 space-y-4">
                {data[activeTab].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          {item.icon}
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>

                    {item.amount ? (
                      <div className={`text-sm font-bold ${item.color}`}>
                        {item.amount}
                        <p className="text-xs font-normal text-gray-500 text-right">{item.status}</p>
                      </div>
                    ) : (
                      <span
                        className={`text-xs text-white px-3 py-1 rounded-full font-medium ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
            </div>
        </div>

    </div>
  );
}
