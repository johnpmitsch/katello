import React, { useState, useEffect } from 'react';
//import PropTypes from 'prop-types';
import { translate as __ } from 'foremanReact/common/I18n';
import { STATUS } from 'foremanReact/constants';

import TableWrapper from './TableWrapper';
import tableDataGenerator from './tableDataGenerator';
import actionResolver from './actionResolver';

const ContentViewTable = ({
  items, status, error, detailsMap={}
}) => {
  const [table, setTable] = useState({ rows: [], columns: [] });
  // Map of CV id to expanded cell, if id not present, row is not expanded
  const [expandedColumnMap, setExpandedColumnMap] = useState({});
  const loading = status === STATUS.PENDING

  useEffect(
    () => {
      if (!loading && items && items.length > 0) {
        const tableData = tableDataGenerator(
          items,
          detailsMap,
          expandedColumnMap,
        );
        setTable(tableData);
      }
    },
    [items],
  );

  const cvIdFromRow = ({ details: { props: rowProps } }) => rowProps.contentviewid;

  const loadDetails = (id) => {
    if (detailsMap[id]) return;
    //loadContentViewDetails(id);
  };

  const onSelect = (event, isSelected, rowId) => {
    let rows;
    if (rowId === -1) {
      rows = table.rows.map(row => ({ ...row, selected: isSelected }));
    } else {
      rows = [...table.rows];
      rows[rowId].selected = isSelected;
    }

    setTable(prevTable => ({ ...prevTable, rows }));
  };

  const onExpand = (_event, _rowIndex, colIndex, isOpen, rowData) => {
    const { rows } = table;
    const contentViewId = cvIdFromRow(rowData);
    // adjust for the selection checkbox cell being counted in the index
    const adjustedColIndex = colIndex - 1;

    if (!isOpen) {
      setExpandedColumnMap(prev => ({ ...prev, [contentViewId]: adjustedColIndex }));
    } else {
      // remove the row completely by assigning it to a throwaway variable
      // eslint-disable-next-line camelcase, no-unused-vars
      const { [contentViewId]: _throwaway, ...newMap } = expandedColumnMap;
      setExpandedColumnMap(newMap);
    }
    loadDetails(contentViewId);

    setTable(prevTable => ({ ...prevTable, rows }));
  };

  const EmptyTitle = __("You currently don't have any Content Views.");
  const EmptyBody = __('A Content View can be added by using the "New content view" button below.');

  const { rows, columns } = table;
  return (
    <TableWrapper
      rows={rows}
      cells={columns}
      status={status}
      EmptyTitle={EmptyTitle}
      EmptyBody={EmptyBody}
      onSelect={onSelect}
      canSelectAll={false}
      onExpand={onExpand}
      actionResolver={actionResolver}
      error={error}
    />
  );
};

//ContentViewTable.propTypes = {
//  //loadContentViewDetails: PropTypes.func.isRequired,
//  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
//  loading: PropTypes.bool.isRequired,
//  detailsMap: PropTypes.shape({}).isRequired,
//};

export default ContentViewTable;
