'use client';

import { useState } from 'react';

function LevelCommissions({
  data,
  search,
  dateRange,
  options,
  currentPage,
  selectedOption,
  onChangeOption,
  onChangePage,
  onSearch,
  onChangeDateRange,
  onFilter,
  meta,
  isFetching,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <p className="text-[22px] font-semibold text-gray-800">
          Level Commissions
        </p>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Date Picker */}
          <input
            type="date"
            value={dateRange?.startDate}
            onChange={(e) =>
              onChangeDateRange({ ...dateRange, startDate: e.target.value })
            }
            className="border rounded-md px-3 py-2 w-[110px]"
          />
          <input
            type="date"
            value={dateRange?.endDate}
            onChange={(e) =>
              onChangeDateRange({ ...dateRange, endDate: e.target.value })
            }
            className="border rounded-md px-3 py-2 w-[110px]"
          />

          {/* Dropdown */}
          <select
            value={selectedOption?.value}
            onChange={(e) =>
              onChangeOption(options.find((opt) => opt.value === e.target.value))
            }
            className="border rounded-md px-3 py-2"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearch(e)}
            className="border rounded-md px-3 py-2 w-[180px]"
          />

          {/* Filter Button */}
          <button
            onClick={onFilter}
            disabled={isFetching}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isFetching ? 'Filtering...' : 'Filter'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm text-gray-700">
            <tr>
              <th className="px-4 py-2">Initiated At</th>
              <th className="px-4 py-2">Trx</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2 text-right">Details</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 text-sm text-gray-800"
                >
                  <td className="px-4 py-2">{item.initiated_at}</td>
                  <td className="px-4 py-2">{item.trx}</td>
                  <td className="px-4 py-2">${item.amount}</td>
                  <td className="px-4 py-2">{item.from_user}</td>
                  <td className="px-4 py-2 text-right">{item.details}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-3">
        {data.length === 0 ? (
          <p className="text-center text-gray-500 font-medium">
            No data available
          </p>
        ) : (
          data.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-sm text-sm"
            >
              <p>
                <strong>Initiated At:</strong> {item.initiated_at}
              </p>
              <p>
                <strong>Trx:</strong> {item.trx}
              </p>
              <p>
                <strong>Amount:</strong> ${item.amount}
              </p>
              <p>
                <strong>User:</strong> {item.from_user}
              </p>
              <p>
                <strong>Details:</strong> {item.details}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {currentPage === 1 && !meta?.next_page_url ? null : (
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => onChangePage(currentPage - 1)}
            disabled={currentPage === 1 || isFetching}
            className="px-4 py-2 border rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => onChangePage(currentPage + 1)}
            disabled={!meta?.next_page_url || isFetching}
            className="px-4 py-2 border rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default LevelCommissions;
