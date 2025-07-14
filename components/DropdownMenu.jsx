'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import {
  useFloating,
  offset as floatingOffset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react';


import Dropicon from '@/icons/Dropicon';
import { cn } from '@/utils';

const menuStyles = cva(
  'absolute z-10 overflow-auto rounded-[20px] border border-[#E4E4E2] bg-white p-[11px] focus:outline-none w-full',
  {
    variants: {
      position: {
        left: 'left-0',
        right: 'right-0',
      },
    },
    defaultVariants: {
      position: 'left',
    },
  }
);

const DropdownMenu = ({
  position = 'left',
  options,
  onChange,
  buttonText,
  children,
  optionClassName,
  buttonClassName = 'min-w-[230px]',
  button,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const { refs, floatingStyles, update } = useFloating({
    middleware: [floatingOffset(10), flip(), shift()],
    placement: 'bottom-start',
  });

  useEffect(() => {
    if (isOpen) {
      return autoUpdate(
        refs?.reference?.current,
        refs.floating.current,
        update
      );
    }
  }, [isOpen, refs, update]);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        ref={(el) => {
          refs.setReference(el);
          buttonRef.current = el;
        }}
        onClick={handleToggleMenu}
        className="w-full block"
      >
        {button && button}
        {buttonText && (
          <button
            className={cn(
              'w-full flex items-center justify-between border border-[#E4E4E2] bg-green px-4 py-[10px] h-[36px] rounded-[30px] text-black',
              buttonClassName
            )}
          >
            <span className="text-sm font-normal">{buttonText}</span>
            <span
              className={cn(
                'transition-transform duration-300',
                !isOpen ? 'rotate-180' : 'rotate-0'
              )}
            >
              <Dropicon />
            </span>
          </button>
        )}
      </div>
      {isOpen && (
        <ul
          ref={(el) => {
            refs.setFloating(el);
            menuRef.current = el;
          }}
          role="menu"
          style={floatingStyles}
          className={cn(menuStyles({ position }), optionClassName)}
        >
          {options?.map((option) => (
            <li
              key={String(option.value)}
              role="menuitem"
              className="cursor-pointer text-black flex gap-2 text-sm items-center rounded-[30px] px-[15px] py-[7px] transition-all hover:bg-black hover:text-white focus:bg-primary-50 w-full"
              onClick={() => handleOptionClick(option)}
            >
              {option.leading && <>{option.leading}</>}
              {option.label}
            </li>
          ))}
          {children}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
