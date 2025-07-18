'use client';

import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';


const buttonVariants = cva(
  'rounded-[30px] font-semibold transition-all duration-200 ease-in-out py-[8.5px] px-[15px] h-9 flex gap-3 items-center justify-center select-none',
  {
    variants: {
      type: {
        primary:
          'dark:bg-primary  bg-black dark:text-black text-white text-sm font-medium leading-[21px] dark:hover:bg-primary-dark hover:bg-[#404040] active:scale-95',
        secondary:
          'dark:bg-[#3B3B3B] bg-[#E5E5E4] dark:hover:bg-[#2E2E2E] hover:bg-[#D1D1D0] dark:text-white text-black text-sm font-medium leading-[21px] active:scale-95',
        plaintext:
          'px-4 py-2 text-sm font-medium leading-[21px] text-[rgba(255, 255, 255, 0.80)] hover:text-white hover:bg-black active:scale-95',
        dark: 'bg-white dark:bg-black text-black dark:text-primary-text border dark:border-[#313131] border-[#E4E4E2] hover:bg-gray-100 dark:hover:bg-gray-900 active:scale-95',
        light:
          'bg-[#E5E5E4] dark:bg-white text-black dark:text-black border border-[#313131] hover:bg-gray-200 dark:hover:bg-gray-300 active:scale-95',
        outline:
          'border dark:border-primary border-[#E5E5E4] dark:text-white text-black dark:hover:bg-primary hover:bg-[#E5E5E4] dark:hover:text-black active:scale-95 rounded-[16px]',
        danger:
          'bg-red-500 text-white dark:text-white dark:bg-red-500 hover:bg-red-600 active:scale-95 text-sm font-medium leading-[21px]',
      },
      size: {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
      },
    },
    defaultVariants: {
      type: 'primary',
      size: 'medium',
    },
  }
);

const Button = ({
  type,
  size,
  children,
  onClick,
  className,
  actionType = 'button',
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(buttonVariants({ type, size }), className, {
        'cursor-default opacity-50': loading || disabled,
      })}
      type={actionType}
      disabled={loading || disabled}
    >
      <div className="flex items-center">
        {loading && <span className="loader mr-2"></span>}
        <div className="flex items-center gap-3">{children}</div>
      </div>
    </button>
  );
};

export default Button;
