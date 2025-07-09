"use client";
import React from "react";

export const InputField = ({
  label,
  placeholder,
  icon,
  required,
  value,
  onChange,
  rightText,
}) => {
  return (
    <div className="mb-4">
      {/* Label stays outside the bordered box */}

      {/* Input box with border and rounded styling */}
      <div className="flex relative items-center justify-between bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-lg px-4 py-3 shadow-sm">
        <label className="text-xs font-semibold text-blue-500 mb-1 block absolute top-[-8px] left-4 bg-white px-1">
          {label.toUpperCase()}
        </label>
        <div className="flex items-center gap-2 w-full">
          {icon}
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="bg-transparent outline-none w-full text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {rightText && (
          <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
            {rightText}
          </span>
        )}
        {required && (
          <span className="text-xs text-gray-400 ml-2">(required)</span>
        )}
      </div>

      {/* Optional (required) note below the input */}
    </div>
  );
};
