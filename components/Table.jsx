import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import React from 'react';


const columnStyles = cva(
  'py-4 px-3 text-[rgba(255, 255, 255, 0.80)] text-sm leading-[21px] font-normal border-b-0',
  {
    variants: {
      align: {
        start: 'text-left',
        end: 'text-right',
        center: 'text-center',
      },
    },
    defaultVariants: {
      align: 'start',
    },
  }
);

const rowStyles = cva('border-b-0 border-gray-700 text-white last:border-b-0');
const tableStyles = cva('w-full border-collapse');

const Table = ({ children, className = '' }) => {
  return (
    <div className={cn(className)}>
      <div className="overflow-x-auto overflow-y-hidden">
        <table className={cn(tableStyles())}>
          <thead>
            <tr>{/* Table header will go here */}</tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
};

const TableRow = ({ children, className = '' }) => {
  return <tr className={cn(rowStyles(), className)}>{children}</tr>;
};

const TableColumn = ({
  children,
  className = '',
  align = 'start',
  colSpan,
}) => {
  return (
    <td className={cn(columnStyles({ align }), className)} colSpan={colSpan}>
      {children}
    </td>
  );
};

const TableBlockRow = ({ data }) => {

  return (
    <div className="flex flex-col p-4 border dark:border-[#313131] border-[#E4E4E2] rounded-md mb-2">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span className="font-semibold text-[rgba(255, 255, 255, 0.80)]">
            {key}:
          </span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};

const TableHeader = ({ children }) => {
  return (
    <tr className="dark:bg-[#000000] dark:text-white bg-green border-none rounded-2xl">
      {children}
    </tr>
  );
};

Table.Row = TableRow;
Table.Column = TableColumn;
Table.Header = TableHeader;
Table.BlockRow = TableBlockRow;

export default Table;
