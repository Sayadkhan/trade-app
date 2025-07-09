
import { cn } from '@/utils';
import React from 'react';



const Card = ({ children, className }) => {
  return (
    <div
      className={cn(
        'py-[14px] px-[24px] rounded-[30px] border dark:border-[#313131] border-[#E4E4E2]  bg-white',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
