import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { TableVariant } from '@patternfly/react-table';
import { STATUS } from 'foremanReact/constants';
import { translate as __ } from 'foremanReact/common/I18n';

import useUrlParamsWithHash from '../../../../utils/useUrlParams';
import onSelect from '../../../../components/Table/helpers';
import TableWrapper from '../../../../components/Table/TableWrapper';
import {
  selectCVFilterDetails,
  selectCVFilterDetailStatus,
  selectCVFilterDetailError,
} from '../ContentViewDetailSelectors';
import { getContentViewFilterDetails } from '../ContentViewDetailActions';
import ContentViewFilterDetailsHeader from './ContentViewFilterDetailsHeader';

const ContentViewFilterDetails = () => {
  const { id: cvId } = useParams();
  // should move to custom hook for hash and query params if we go with this approach
  const { params: { subContentId: filterId } } = useUrlParamsWithHash();
  const response = useSelector(state => selectCVFilterDetails(state, cvId, filterId), shallowEqual);
  const status = useSelector(state => selectCVFilterDetailStatus(state, cvId, filterId), shallowEqual);
  const error = useSelector(state => selectCVFilterDetailError(state, cvId, filterId), shallowEqual);
  const [rows, setRows] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [searchQuery, updateSearchQuery] = useState('');
  const loading = status === STATUS.PENDING;

  const columnHeaders = [
    __('Name'),
    __('Product'),
    __('Repository'),
    __('Description'),
    __('Status'),
  ];

  const buildRows = (results) => {
    const newRows = [];
    console.log(results);
    results.forEach((packageGroups) => {
      const {
        name,
        description,
        repository: {
          name: repositoryName,
          product: { name: productName }
        },
        filter_ids: filterIds,
      } = packageGroups;
      const cells = [
        { title: name },
        { title: productName },
        { title: repositoryName },
        { title: description},
        { title: filterIds.includes(parseInt(filterId)) ? 'added' : 'not added' },
      ];

      newRows.push({ cells });
    });

    return newRows;
  };

  useEffect(() => {
    const { results, ...meta } = response;
    setMetadata(meta);

    if (!loading && results) {
      const newRows = buildRows(results);
      setRows(newRows);
    }
  }, [JSON.stringify(response)]);

  const emptyContentTitle = __("You currently don't have any package groups associated with this filter.");
  const emptyContentBody = __("Add to this filter using the 'Add package group' button above.");
  const emptySearchTitle = __('No matching package groups found');
  const emptySearchBody = __('Try changing your search settings.');

  return (
    <>
      <ContentViewFilterDetailsHeader cvId={cvId} filterId={filterId} />
      <TableWrapper
        {...{
          rows,
          metadata,
          emptyContentTitle,
          emptyContentBody,
          emptySearchTitle,
          emptySearchBody,
          searchQuery,
          updateSearchQuery,
          error,
          status,
        }}
        status={status}
        onSelect={onSelect(rows, setRows)}
        cells={columnHeaders}
        variant={TableVariant.compact}
        autocompleteEndpoint={`/package_groups/auto_complete_search?filterid=${filterId}`}
        fetchItems={params => getContentViewFilterDetails(cvId, filterId, params)}
      />
    </>);
};

export default ContentViewFilterDetails;
