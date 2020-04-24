import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
} from '@patternfly/react-table';
import EmptyStateMessage from '../components/EmptyStateMessage';
import Loading from './Loading'
import { STATUS } from 'foremanReact/constants';

const TableWrapper = ({ status, cells, rows, error, EmptyBody, EmptyTitle, ...extraTableProps}) => {
  console.log(status);
  if (status === STATUS.PENDING) return (<Loading />);
  if (status === STATUS.RESOVLED && rows.length === 0) return (<EmptyStateMessage title={EmptyTitle} body={EmptyBody} />);
  // handle error state
  // API data not overwriting when switching orgs?

  const tableProps = { cells, rows, ...extraTableProps}
  return (
    <Table
      aria-label="Content View Table"
      className="katello-pf4-table"
      {...tableProps}
    >
      <TableHeader />
      <TableBody />
    </Table>
  );
}

export default TableWrapper;