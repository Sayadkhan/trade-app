"use client";
import Navbar from '@/components/navbar/navbar';
import React from 'react';
import { RefreshCcw, FileText, ArrowDown, ArrowUp } from 'lucide-react';
import { Search } from 'lucide-react';
import { RiBarChartGroupedLine } from "react-icons/ri";

const actions = [
  {
    title: 'Exchange',
    subtitle: 'Convert Currency',
    icon: <RefreshCcw size={28} className="text-green-500" />,
    color: 'bg-green-100',
  },
  {
    title: 'Pay a Bill',
    subtitle: 'Bills and Invoices',
    icon: <FileText size={28} className="text-red-500" />,
    color: 'bg-red-100',
  },
  {
    title: 'Request',
    subtitle: 'Request or Deposit',
    icon: <ArrowDown size={28} className="text-yellow-500" />,
    color: 'bg-yellow-100',
  },
  {
    title: 'Transfer',
    subtitle: 'Move and Send',
    icon: <ArrowUp size={28} className="text-blue-500" />,
    color: 'bg-blue-100',
  },
];

const Page = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Navbar />

      <div className="wrapper mt-6 grid grid-cols-2 gap-5">
        {actions.map((action, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center text-center space-y-3"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center ${action.color}`}
            >
              {action.icon}
            </div>
            <h4 className="font-semibold text-lg">{action.title}</h4>
            <p className="text-sm text-gray-500">{action.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="wrapper flex flex-col gap-10 mb-24 md:mb-18 lg:mb-12">
        <div className="bg-white shadow-lg rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#309e99] flex items-center justify-center">
              <Search className="text-white" size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Search</h4>
              <p className="text-sm text-gray-500">Filter your Transactions.</p>
            </div>
          </div>
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            NEW
          </span>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#eeb154] flex items-center justify-center">
   
              <RiBarChartGroupedLine className="text-white" size={24}/>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Account Reports</h4>
              <p className="text-sm text-gray-500">Filter your Transactions.</p>
            </div>
          </div>
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            NEW
          </span>
        </div>
      </div>

    </div>
  );
};

export default Page;
