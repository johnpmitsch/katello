import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Tabs, Grid, GridItem, TextContent, Text, TextVariants } from '@patternfly/react-core';
import { translate as __ } from 'foremanReact/common/I18n';
import PropTypes from 'prop-types';

import DetailsContainer from './DetailsContainer';
import ContentViewInfo from './ContentViewInfo';
import { selectCVDetails } from './ContentViewDetailSelectors';
import TabWrapper from '../../../components/TabWrapper/TabWrapper';

const ContentViewDetails = ({ match }) => {
  const cvId = parseInt(match.params.id, 10);
  const details = useSelector(state => selectCVDetails(state, cvId), shallowEqual);
  const [activeTabKey, setActiveTabKey] = useState(0);
  const handleTabClick = (_event, tabIndex) => setActiveTabKey(tabIndex);
 
  const { name } = details
  const tabs = [
    {
      title: __('Versions'),
      content: <React.Fragment>Versions</React.Fragment>,
    },
    {
      title: __('Repositories'),
      content: <React.Fragment>Repositories</React.Fragment>,
    },
    {
      title: __('Filters'),
      content: <React.Fragment>Filters</React.Fragment>,
    },
    {
      title: __('History'),
      content: <React.Fragment>History</React.Fragment>,
    },
    {
      title: __('Tasks'),
      content: <React.Fragment>Tasks</React.Fragment>,
    },
  ];

  return (
    <Grid className="grid-with-margin">
      <DetailsContainer cvId={cvId}>
        <React.Fragment>
          <GridItem span={12}>
            <TextContent>
              <Text component={TextVariants.h1}>{`${name} content view`}</Text>
            </TextContent>
          </GridItem>
          <GridItem span={12}>
            <Tabs activeKey={activeTabKey} onSelect={handleTabClick}>
              <TabWrapper title= {__("Details")} index={0}>
                <ContentViewInfo {...{cvId, details}} />
              </TabWrapper>
            </Tabs>
          </GridItem>
        </React.Fragment>
      </DetailsContainer>
    </Grid>
  );
};

ContentViewDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};

export default ContentViewDetails;
