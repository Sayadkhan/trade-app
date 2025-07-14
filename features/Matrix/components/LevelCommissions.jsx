'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import DropdownMenu from '@/components/DropdownMenu';
import Table from '@/components/Table';
import FilterIcon from '@/icons/FilterIcon';

import SearchIcon from '@/icons/SearchIcon';
import DateRangePicker from '@/components/DateRangePicker';
import Paginator from '@/components/Paginator';
// import TableNoData from '@/components/TableNoData';
import { InputField } from '@/components/inputFileds';
import TableNoData from '@/components/TableNoData';

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
  const BlockTableData = data.map((item, index) => (
    <Table.BlockRow
      key={index}
      data={{
        'Initiated At': item.initiated_at,
        Trx: item.trx,
        Amount: `$${item.amount}`,
        User: item.from_user,
        Details: item.details,
      }}
    />
  ));

  return (
    <Card>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <p className="text-black text-[22px] leading-[33px] font-normal">
          Level Commissions
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-[230px]">
            <DateRangePicker
              selectedDateRange={dateRange}
              onChange={onChangeDateRange}
            />
          </div>
          <DropdownMenu
            options={options}
            onChange={onChangeOption}
            buttonText={selectedOption.label}
          />

          <div className="max-w-[230px]">
            <InputField
              onChange={onSearch}
              value={search}
              leading={<SearchIcon />}
              className="h-[36px]"
            />
          </div>
          <Button
            onClick={onFilter}
            loading={isFetching}
            type="dark"
            className="rounded-lg"
          >
            <FilterIcon />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto md:block hidden">
        <Table>
          <Table.Header>
            <Table.Column className="rounded-l-full">Initiated At</Table.Column>
            <Table.Column>Trx</Table.Column>
            <Table.Column>Amount</Table.Column>
            <Table.Column>User</Table.Column>
            <Table.Column className="rounded-r-full" align="end">
              Details
            </Table.Column>
          </Table.Header>
          {data.length === 0 && <TableNoData />}
          {data.map((item, index) => (
            <Table.Row key={index}>
              <Table.Column>{item.initiated_at}</Table.Column>
              <Table.Column>{item.trx}</Table.Column>
              <Table.Column>${item.amount}</Table.Column>
              <Table.Column>{item.from_user}</Table.Column>
              <Table.Column align="end">{item.details}</Table.Column>
            </Table.Row>
          ))}
        </Table>
      </div>

      <div className="block md:hidden">
        {data?.length ? (
          BlockTableData
        ) : (
          <p className="text-center text-bold">No data available</p>
        )}
      </div>
      {currentPage === 1 && !meta.next_page_url ? null : (
        <Paginator
          currentPage={currentPage}
          onPageChange={onChangePage}
          hasNextPage={meta.next_page_url !== null}
          isFetching={isFetching}
        />
      )}
    </Card>
  );
}

export default LevelCommissions;
