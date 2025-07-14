"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import PasswordIcon from "@/icons/auth/PasswordIcon";
import EmailIcon from "@/icons/auth/EmailIcon";
import { CloseEyeIcon, OpenEyeIcon } from "@/icons/auth/EyeIcon";
import useGlobalSettings from "@/hooks/useGlobalSettings";

function SignInForm({ isLoadingSignIn, register, onLogin, errors }) {
  const { data } = useGlobalSettings();

  const [passwordVisible, setPasswordVisible] = useState({
    password: "password",
  });

  const handlePasswordVisibility = () => {
    setPasswordVisible((prev) => ({
      password: prev.password === "password" ? "text" : "password",
    }));
  };

  const logo = data?.white_logo;

  return (
    <form
      onSubmit={onLogin}
      className="max-w-md w-full mx-auto mt-10 bg-white border border-gray-200 shadow-lg rounded-3xl p-8 space-y-6"
    >
      {/* Logo & Heading */}
      <div className="flex flex-col items-center">
        <Image
          src={logo}
          height={60}
          width={60}
          alt="logo"
          className="mb-2 object-contain"
        />
        <p className="text-xl font-semibold text-gray-900">
          {data?.site_title}
        </p>
        <h2 className="mt-2 text-lg font-medium text-gray-600">
          Access Your Trading Hub
        </h2>
      </div>

      {/* Email Field */}
      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
          <EmailIcon />
          Email
        </label>
        <input
          type="email"
          placeholder="example@email.com"
          {...register("email")}
          className="w-full h-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        {errors?.email?.message && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
          <PasswordIcon />
          Password
        </label>
        <div className="relative">
          <input
            type={passwordVisible.password}
            placeholder="••••••••"
            {...register("password")}
            className="w-full h-11 px-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          <span
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            onClick={handlePasswordVisibility}
          >
            {passwordVisible.password === "password" ? (
              <CloseEyeIcon />
            ) : (
              <OpenEyeIcon />
            )}
          </span>
        </div>
        {errors?.password?.message && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Forgot Password */}
      <div className="flex justify-end">
        <Link
          href="/reset-password"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoadingSignIn}
        className={`w-full h-11 rounded-lg text-white font-medium transition duration-200 ${
          isLoadingSignIn
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoadingSignIn ? "Logging in..." : "Log In"}
      </button>

      {/* Footer */}
      <p className="text-sm text-center text-gray-700">
        Don’t have an account?{" "}
        <Link href="/sign-up" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}

export default SignInForm;
