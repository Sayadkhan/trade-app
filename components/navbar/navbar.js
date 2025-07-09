"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosNotifications } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="">
      <div className="container mx-auto w-full px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <span>Tuesday 26 june </span>
            <span>Abdullah Al Sayad</span>
          </div>

          <div className="flex items-center">
            {/* notification */}
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
              <span>
                <IoIosNotifications className="text-3xl text-black" />
              </span>
            </div>

            {/* image */}
            <Link
              href={"/settings"}
              className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center ml-4"
            >
              <Image
                width={300}
                height={300}
                src={"https://i.pravatar.cc/100"}
                alt="profile image"
                className="rounded-full object-cover w-full h-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
