'use client';

import { useState } from 'react';

import MatrixEnrollInfromation from './components/MatrixEnrollInfromation';

import LevelCommissions from './components/LevelCommissions';
// import useMatrix from '@/hooks/useMatrix';
import Loader from '@/components/Loader';
// import { getDateValues } from '@/utilits';
import useDebounce from '@/hooks/useDebounce';
import useMatrix from '@/hooks/useMatrix';
import { getDateValues } from '@/utils';
import InvestNowCard from './components/InvestNowCard';

const options = [
  { value: '1', label: 'Initiated' },
  { value: '2', label: 'Profit Completed' },
  { value: '3', label: 'Completed' },
  { value: '4', label: 'Canceled' },
];

function Schema() {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedQuery = useDebounce(search, 500);
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });
  const [queries, setQueries] = useState({
    status: '',
    date: '',
  });

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleFilter = () => {
    setQueries({
      status: selectedOption.value || '',
      date: getDateValues(dateRange) || '',
    });
  };

  const params = {
    search: debouncedQuery,
    page: currentPage,
    ...queries,
  };

  const { data, isLoading, isSuccess, isFetching } = useMatrix({ params });

  console.log('Matrix Data:', data);

  if (isLoading || !isSuccess) {
    return <Loader />;
  }

  return (
    <div className="space-y-2">
      {data?.matrix_log && <MatrixEnrollInfromation log={data?.matrix_log} />}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {data?.plans?.map((plan, index) => (
          <InvestNowCard key={index} plan={plan} />
        ))}
      </div>
      <LevelCommissions
        isFetching={isFetching}
        data={data.level_commissions}
        meta={data.level_commissions_meta}
        currentPage={currentPage}
        search={search}
        dateRange={dateRange}
        options={options}
        selectedOption={selectedOption}
        onChangeOption={handleOptionChange}
        onChangePage={handleChangePage}
        onSearch={handleSearch}
        onChangeDateRange={handleDateRangeChange}
        onFilter={handleFilter}
      />
    </div>
  );
}

export default Schema;
