import Table from "./Table";




function TableNoData({ colSpan = 6 }) {
  return (
    <Table.Row>
      <Table.Column colSpan={colSpan} className="text-center py-4 font-bold">
        No data available
      </Table.Column>
    </Table.Row>
  );
}

export default TableNoData;
