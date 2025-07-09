"use client";

import { useSidebarStore } from "@/stores/sidebarStore";
import { X } from "lucide-react";

export default function Sidebar() {
  const sidebarOpen = useSidebarStore((state) => state.sidebar);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  if (!sidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-[99998] bg-black/30 backdrop-blur-sm">
      <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg p-4 transition-transform duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-800"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="space-y-3 text-sm">
          <li className="hover:text-blue-500 cursor-pointer">Profile</li>
          <li className="hover:text-blue-500 cursor-pointer">Settings</li>
          <li className="hover:text-blue-500 cursor-pointer">Notifications</li>
          <li className="hover:text-blue-500 cursor-pointer">Help</li>
        </ul>
      </div>
    </div>
  );
}
