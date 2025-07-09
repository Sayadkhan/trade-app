"use client";

import { useState } from "react";
import BottomMenu from "../menutab";
import { useSidebarStore } from "@/stores/sidebarStore";

export default function BottomMenuWrapper() {
  const { toggleSidebar } = useSidebarStore();

  return (
    <div className="wrapper fixed bottom-5 left-0 right-0 z-[99999]">
      <BottomMenu toggleSidebar={toggleSidebar} />
    </div>
  );
}
