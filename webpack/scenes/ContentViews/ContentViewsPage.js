import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import ContentViewsTable from './Table/ContentViewsTable';

const ContentViewsPage = ({ loadContentViews, ...tableProps }) => {
  useEffect(() => {
    loadContentViews();
  }, []);

  return (
    <React.Fragment>
      <h1>{__("Content Views")}</h1>
      <ContentViewsTable {...tableProps} />
    </React.Fragment>
  );
};

ContentViewsPage.propTypes = {
  contentViews: PropTypes.shape({
    results: PropTypes.array,
  }),
};

ContentViewsPage.defaultProps = {
  contentViews: null,
};

export default ContentViewsPage;
