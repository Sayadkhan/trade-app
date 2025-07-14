"use client";
import { useEffect } from "react";

export const useFavicon = (url) => {
  useEffect(() => {
    if (!url) return;

    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");

    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = url;

    if (!document.head.contains(link)) {
      document.head.appendChild(link);
    }
  }, [url]);
};
