import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { selectContentViews, selectContentViewStatus, selectContentViewError } from './ContentViewSelectors';
import { translate as __ } from 'foremanReact/common/I18n';
import { useSelector, useDispatch } from 'react-redux';
import { getContentViews } from './ContentViewsActions';

import ContentViewsTable from './Table/ContentViewsTable';

const ContentViewsPage = () => {
  const items = useSelector(selectContentViews);
  const status = useSelector(selectContentViewStatus);
  const error = useSelector(selectContentViewError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContentViews());
  }, []);

  return (
    <React.Fragment>
      <h1>{__('Content Views')}</h1>
      <ContentViewsTable {...{ items, status, error }} />
    </React.Fragment>
  );
}

export default ContentViewsPage;
