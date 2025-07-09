"use client";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function TransferModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex  z-[9999999]  ">
   <div className="w-full h-full relative wrapper">
     <div className="absolute bottom-0 left-0 right-0">
        <div className="bg-white rounded-xl p-6 w-full  shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Transfer Funds</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-700">Choose Account</label>
            <select className="w-full border rounded p-2">
              <option>Main Account</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">ID Number</label>
            <input type="text" placeholder="BNK_1245" className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">Amount (USD)</label>
            <input type="number" placeholder="150.00" className="w-full border rounded p-2" />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">
              I accept the <a href="#" className="text-blue-600">Terms of Service</a>
            </span>
          </div>

          <button className="bg-green-500 w-full text-white p-2 rounded-lg font-semibold">
            Transfer Funds
          </button>
        </div>
      </div>
     </div>
   </div>
    </div>
  );
}
