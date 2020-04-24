import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { selectItems, selectStatus, selectError } from './ContentViewSelectors';
import { translate as __ } from 'foremanReact/common/I18n';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from './ContentViewsActions';

import ContentViewsTable from './Table/ContentViewsTable';

const path = '/katello/api/v2/content_views';

const ContentViewsPage = () => {
  const items = useSelector(selectItems);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData(path));
  }, [path]);

  return (
    <React.Fragment>
      <h1>{__('Content Views')}</h1>
      <ContentViewsTable {...{ items, status, error }} />
    </React.Fragment>
  );
}

export default ContentViewsPage;
