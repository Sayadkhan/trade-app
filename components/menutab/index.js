"use client";

import { Home, CreditCard, Activity, List, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomMenu({ toggleSidebar }) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/cards", icon: <CreditCard size={24} />, label: "Cards" },
    { href: "/activity", icon: <Activity size={24} />, label: "Activity" },
    { href: "/", icon: <Home size={24} />, label: "Home" },
    { href: "/payments", icon: <List size={24} />, label: "Payments" },
    {
      href: "",
      icon: <MoreHorizontal size={24} />,
      label: "More",
      isButton: true,
    },
  ];

  return (
    <div className="bg-white/90 flex justify-around items-center px-2 py-2 lg:px-5 lg:py-3 border-t border-gray-200 rounded-full shadow-xl">
      {menuItems.map((item) =>
        item.isButton ? (
          <MenuButton
            key={item.label}
            icon={item.icon}
            label={item.label}
            onClick={toggleSidebar} //
          />
        ) : (
          <MenuItem
            key={item.label}
            href={item.href}
            icon={item.icon}
            label={item.label}
            active={pathname === item.href}
          />
        )
      )}
    </div>
  );
}

function MenuItem({ icon, label, active, href }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center relative"
    >
      <div
        className={`p-2 rounded-full transition-all duration-300 ${
          active ? "bg-blue-100 text-blue-600 shadow-md" : "text-gray-600"
        }`}
      >
        {icon}
      </div>
      <span
        className={`text-xs mt-1 ${
          active ? "text-blue-600 font-medium" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

function MenuButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center relative text-gray-600"
    >
      <div className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300">
        {icon}
      </div>
      <span className="text-xs mt-1 text-gray-500">{label}</span>
    </button>
  );
}
