import React, { Fragment } from 'react';
import { Switch } from '@patternfly/react-core';
import { noop } from 'foremanReact/common/helpers';
import PropTypes from 'prop-types';

const EditableCheckbox = ({
  value, attribute, onEdit, editable,
}) => {
  const boolToYesNo = v => (v ? 'Yes' : 'No');
  const identifier = `checkbox-${attribute}`;

  return (
    <Fragment>
      {editable ?
        <Switch
          id={identifier}
          aria-label={identifier}
          isChecked={value}
          onChange={v => onEdit(v, attribute)}
        /> :
      boolToYesNo(value)
    }
    </Fragment>
  );
};

EditableCheckbox.propTypes = {
  value: PropTypes.bool.isRequired,
  attribute: PropTypes.string,
  onEdit: PropTypes.func,
  editable: PropTypes.bool,
};

EditableCheckbox.defaultProps = {
  attribute: '',
  onEdit: noop,
  editable: false,
};

export default EditableCheckbox;
