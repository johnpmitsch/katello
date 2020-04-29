import React from 'react';
import { EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Bullseye,
  Title } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import { CubeIcon, ExclamationCircleIcon } from '@patternfly/react-icons';
import { global_danger_color_200 as dangerColor } from '@patternfly/react-tokens';

const errorTitle = 'Unable to retrieve information from the server.';
const errorBody = 'Please check the server logs for more information';

const EmptyStateMessage = ({ title = errorTitle, body = errorBody, error = false }) => (
  <Bullseye>
    <EmptyState variant={EmptyStateVariant.small}>
      {error ?
        <EmptyStateIcon icon={ExclamationCircleIcon} color={dangerColor.value} /> :
        <EmptyStateIcon icon={CubeIcon} />}
      <Title headingLevel="h2" size="lg">
        {title}
      </Title>
      <EmptyStateBody>
        {body}
      </EmptyStateBody>
    </EmptyState>
  </Bullseye>
);

EmptyStateMessage.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default EmptyStateMessage;
