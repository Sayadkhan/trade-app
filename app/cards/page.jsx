"use client";

import React, { useState } from "react";
import CardHero from "@/components/cardHero";
import Navbar from "@/components/navbar/navbar";
import {
  ChevronDown,
  Droplet,
  ShoppingCart,
  Home,
  PiggyBank,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const tabs = ["Settings", "History", "Activity"];

const transactions = [
  {
    icon: <PiggyBank className="text-green-600" size={20} />,
    title: "Savings",
    count: "14 Transactions",
    amount: "$414",
    percent: "13.5%",
    color: "text-green-600",
  },
  {
    icon: <Droplet className="text-yellow-500" size={20} />,
    title: "Utilities",
    count: "11 Transactions",
    amount: "$631",
    percent: "20.3%",
    color: "text-yellow-500",
  },
  {
    icon: <ShoppingCart className="text-blue-600" size={20} />,
    title: "Shopping",
    count: "23 Transactions",
    amount: "$950",
    percent: "45.7%",
    color: "text-blue-600",
  },
  {
    title: "Construction",
    count: "34 Transactions",
    amount: "$315",
    percent: "19.5%",
    color: "text-red-500",
  },
  {
    icon: <Home className="text-purple-500" size={20} />,
    title: "Other Costs",
    count: "15 Transactions",
    amount: "$530",
    percent: "35.5%",
    color: "text-purple-500",
  },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("History");

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      <Navbar />
      <CardHero />

      <div className="wrapper w-full p-4 bg-white rounded-2xl shadow mb-24 max-w-md mx-auto mt-5">
        {/* Tabs */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex bg-gray-100 rounded-full p-1 w-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-sm py-2 rounded-full transition-all ${
                  activeTab === tab
                    ? "bg-blue-500 text-white font-medium"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="overflow-y-scroll h-[20rem]"
          >
            {activeTab === "Activity" && (
              <>
                <div className="flex justify-between items-center text-sm text-gray-700 mt-4 mb-2">
                  <span className="font-medium">Latest Activity</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="space-y-4">
                  {transactions.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.count}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {item.amount}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.percent}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

              {activeTab === "Settings" && (
              <div className="space-y-4 text-sm text-gray-700">
                {/* Use Online Payments */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-200 text-green-700 p-2 rounded-full">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M..." /></svg>
                    </div>
                    <div>
                      <div className="font-semibold">Use Online Payments</div>
                      <div className="text-xs text-gray-500">Use this card to pay online</div>
                    </div>
                  </div>
                  <input type="checkbox" className="toggle toggle-sm" />
                </div>

                {/* Use NFC Payments */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-200 text-purple-700 p-2 rounded-full">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M..." /></svg>
                    </div>
                    <div>
                      <div className="font-semibold">Use NFC Payments</div>
                      <div className="text-xs text-gray-500">Pay With Card Contactless</div>
                    </div>
                  </div>
                  <input type="checkbox" className="toggle toggle-sm" defaultChecked />
                </div>

                {/* Change Card Name */}
                <button className="flex items-center justify-between p-4 rounded-xl bg-blue-100 text-blue-600 font-medium w-full">
                  <span>Change Card Name</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M..." /></svg>
                </button>

                {/* Remove this Card */}
                <button className="flex items-center justify-between p-4 rounded-xl bg-red-100 text-red-600 font-medium w-full">
                  <span>Remove this Card</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M..." /></svg>
                </button>

                {/* Report Lost or Stolen */}
                <button className="flex items-center justify-between p-4 rounded-xl bg-yellow-100 text-yellow-600 font-medium w-full">
                  <span>Report Lost or Stolen</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M..." /></svg>
                </button>
              </div>
             )}


            {activeTab === "History" && (
              <div className="py-6 text-gray-600 text-sm">History content here</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
