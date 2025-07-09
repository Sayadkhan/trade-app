"use client"

import { fetchInvestmentsScheme } from '@/actions/investment';
import InvestmentCard from '@/components/investment/InvestmentCard';
import InvestmentModal from '@/components/modal/InvestmentModal';
import Navbar from '@/components/navbar/navbar'
import useDebounce from '@/hooks/useDebounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'

const page = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedQuery = useDebounce(search, 500);
    const [queries, setQueries] = useState({
    status: "",
    date: "",
  });

  const [investMentOpen, setInvestmentOpen] = useState(null)

    const params = {
    search: debouncedQuery,
    page: currentPage, 
  };

  const { data, isLoading, isSuccess, isFetching } =
    useQuery({
      queryKey: [
        "investments-statistics",
        debouncedQuery,
        queries,
        currentPage,
      ],
      queryFn: () => fetchInvestmentsScheme({ ...params, ...queries }),
      placeholderData: keepPreviousData,
    });


    console.log(data)



  return (
 <>
 <Navbar/>
    <div className='wrapper'>
      <div className="grid sm:grid-cols-2 gap-3 mb-32">
        {data?.data?.investment_plans?.map((schema, index) => (
          <div key={index}>
             <InvestmentCard plan={schema} investMentOpen={investMentOpen} setInvestmentOpen={setInvestmentOpen}/> 
          </div>
        ))}
      </div>

      {investMentOpen && (
         <InvestmentModal plan={investMentOpen} onClose={() => setInvestmentOpen(null)} />
        )}
    </div>
  </>
  )
}

export default page
