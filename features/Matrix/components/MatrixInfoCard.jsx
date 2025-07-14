import React from 'react';



function MatrixInfoCard({ title, content }) {
  return (
    <div className="flex flex-col rounded-2xl border dark:border-[#33353D] border-[#E4E4E2] dark:bg-[#FFFFFF1A] bg-green backdrop-blur-[17.5px] pl-4 py-3 min-w-full">
      <div className="min-w-full">
        <p className="dark:text-primary-text text-[14px] leading-[21px]">
          {title}
        </p>
        <p className="dark:text-primary-text text-[15px] leading-normal">
          {content}
        </p>
      </div>
    </div>
  );
}

export default MatrixInfoCard;
