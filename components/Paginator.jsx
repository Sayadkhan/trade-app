import React from 'react';

const Paginator = ({
  currentPage,
  isFetching,
  hasNextPage,
  onPageChange,
}) => {
  const handleNextPage = () => {
    if (!isFetching && hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex items-center justify-end gap-5 border-t dark:border-[#313131] border-[#E4E4E2] pt-5">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1 || isFetching}
        className={`px-4 py-2 border rounded-md text-sm font-medium ${
          currentPage === 1 || isFetching
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white text-black hover:bg-gray-100 dark:bg-[#1a1a1a] dark:text-white dark:hover:bg-[#2a2a2a]'
        }`}
      >
        Previous
      </button>
      <button
        onClick={handleNextPage}
        disabled={!hasNextPage || isFetching}
        className={`px-4 py-2 border rounded-md text-sm font-medium ${
          !hasNextPage || isFetching
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white text-black hover:bg-gray-100 dark:bg-[#1a1a1a] dark:text-white dark:hover:bg-[#2a2a2a]'
        }`}
      >
        {isFetching ? 'Loading...' : 'Next'}
      </button>
    </div>
  );
};

export default Paginator;
