import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Icon } from 'patternfly-react';

class SubscriptionDeleteModal extends Component {
  // TODO: fix modal bug
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.onClose}>
        <Modal.Header>
          <Button
            className="close"
            onClick={this.props.onClose}
            aria-hidden="true"
            aria-label="Close"
          >
            <Icon type="pf" name="close" />
          </Button>
          <Modal.Title>Confirm deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete <b>{this.props.selectedRows.length} </b>
             subscription(s)? This action will remove the subscription(s) and
             refresh your manifest. This cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="default"
            className="btn-cancel"
            onClick={this.props.onClose}
          >
            Cancel
          </Button>
          <Button
            bsStyle="danger"
            onClick={this.props.deleteSubscriptions}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

SubscriptionDeleteModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.number),
  deleteSubscriptions: PropTypes.func.isRequired,
};

SubscriptionDeleteModal.defaultProps = {
  selectedRows: [],
};

export default SubscriptionDeleteModal;
