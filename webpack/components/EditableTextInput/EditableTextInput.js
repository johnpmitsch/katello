import React, { useState } from 'react';
import { TextInput, TextArea, Text, TextVariants, Button, Split, SplitItem } from '@patternfly/react-core';
import { TimesIcon, CheckIcon, PencilAltIcon } from '@patternfly/react-icons';
import { translate as __ } from 'foremanReact/common/I18n';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import './editableTextInput.scss';

const EditableTextInput = ({
  onEdit, value, textArea, editable, attribute,
}) => {
  // Tracks input box state
  const [inputValue, setInputValue] = useState(value);
  const [editing, setEditing] = useState(false);
  const [working, setWorking] = useState(false);
  const onSubmit = async () => {
    setWorking(true);
    await onEdit(inputValue, attribute);
    setWorking(false);
    setEditing(false);
  };
  const onClear = () => {
    setInputValue(value);
    setEditing(false);
  };

  const textInput = () => {
    const sharedProps = {
      value: inputValue || '',
      onChange: v => setInputValue(v),
    };

    if (textArea) {
      return <TextArea {...sharedProps} aria-label={`${attribute} text area`} />;
    }
    return <TextInput {...sharedProps} type="text" aria-label={`${attribute} text input`} />;
  };

  const displayValue = () => (value || <i>{__('None provided')}</i>);

  if (working) return <Loading size="sm" />;
  if (editing) {
    return (
      <Split>
        <SplitItem>
          {textInput()}
        </SplitItem>
        <SplitItem>
          <Button aria-label={`submit ${attribute}`} variant="plain" onClick={onSubmit}>
            <CheckIcon />
          </Button>
        </SplitItem>
        <SplitItem>
          <Button aria-label={`clear ${attribute}`} variant="plain" onClick={onClear}>
            <TimesIcon />
          </Button>
        </SplitItem>
      </Split>
    );
  }
  return (
    <Split>
      <SplitItem>
        <Text aria-label={`${attribute} text value`} component={TextVariants.p}>
          {displayValue()}
        </Text>
      </SplitItem>
      {editable &&
      <SplitItem>
        <Button
          className="foreman-edit-icon"
          aria-label={`edit ${attribute}`}
          variant="plain"
          onClick={() => setEditing(true)}
        >
          <PencilAltIcon />
        </Button>
      </SplitItem>}
    </Split>
  );
};

EditableTextInput.propTypes = {
  onEdit: PropTypes.func.isRequired,
  value: PropTypes.string,
  attribute: PropTypes.string.isRequired,
  textArea: PropTypes.bool, // Is a text area instead of input when editing
  editable: PropTypes.bool,
};

EditableTextInput.defaultProps = {
  textArea: false,
  editable: true,
  value: '', // API can return null, so default to empty string
};

export default EditableTextInput;
