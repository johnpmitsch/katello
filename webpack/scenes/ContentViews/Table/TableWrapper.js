import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
} from '@patternfly/react-table';
import EmptyStateMessage from '../components/EmptyStateMessage';
import Loading from './Loading';
import { STATUS } from 'foremanReact/constants';

const TableWrapper = ({
  status, cells, rows, error, EmptyBody, EmptyTitle, ...extraTableProps
}) => {
  const errorTitle = 'Unable to retrieve information from the server.';
  const errorBody = 'Please check the server logs for more information';
  if (status === STATUS.PENDING) return (<Loading />);
  // Can we display the error message?
  if (status === STATUS.ERROR) return (<EmptyStateMessage title={errorTitle} body={errorBody} error={error} />);
  // Can we prevent flash of empty row message while rows are loading with data?
  if (status === STATUS.RESOLVED && rows.length === 0) return (<EmptyStateMessage title={EmptyTitle} body={EmptyBody} />);

  const tableProps = { cells, rows, ...extraTableProps };
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
};

export default TableWrapper;
