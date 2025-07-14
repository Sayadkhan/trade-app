"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";

import useGlobalSettings from "@/hooks/useGlobalSettings";

import Logo from "@/icons/Logo";
import { fetchUser } from "@/actions/User";
import { useFavicon } from "@/hooks/useFavicon";

const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const { resolvedTheme } = useTheme();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    refetchOnWindowFocus: true,
  });

  const {
    data: globalSettings,
    isLoading: isGlobalSettingsLoading,
    isSuccess: isSuccessGlobalSettings,
  } = useGlobalSettings();

  const favIcon =
    resolvedTheme === "dark"
      ? globalSettings?.dark_logo
      : globalSettings?.white_logo;

  useFavicon(favIcon);

  if (
    isLoading ||
    !isSuccess ||
    isGlobalSettingsLoading ||
    !isSuccessGlobalSettings
  ) {
    return (
      <div className="fixed inset-0 flex items-center justify-center -z-10">
        <div className="spin-and-zoom-animation transition-transform duration-500">
          <Logo />
        </div>
      </div>
    );
  }

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
