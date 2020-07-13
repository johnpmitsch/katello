import React from 'react';
import {
  TextListItem,
  TextListItemVariants,
  Tooltip,
  TooltipPosition,
} from '@patternfly/react-core';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';

import EditableTextInput from '../../../components/EditableTextInput';
import EditableCheckbox from '../../../components/EditableCheckbox';

const ActionableDetail = ({ attribute, label, value, textArea=false, boolean=false, tooltip, onEdit }) => {
  const displayProps = { attribute, value, onEdit };

  return (
    <React.Fragment key={label}>
      <TextListItem component={TextListItemVariants.dt}>
        {label}
        {tooltip &&
        <span className="foreman-spaced-icon">
          <Tooltip
            position={TooltipPosition.top}
            content={tooltip}
          >
            <OutlinedQuestionCircleIcon />
          </Tooltip>
        </span>
      }
      </TextListItem>
      <TextListItem component={TextListItemVariants.dd} className={"foreman-spaced-list"}>
        {boolean ? 
          <EditableCheckbox {...displayProps} /> :
          <EditableTextInput {...{ ...displayProps, textArea, onEdit }} />}
      </TextListItem>
    </React.Fragment>
  );
}

export default ActionableDetail;