import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { Grid, Row, Col, Form, FormGroup } from 'react-bootstrap';
import { bindMethods, Button, Spinner } from 'patternfly-react';
import Table from '../../move_to_foreman/components/common/table';
import PaginationRow from '../../components/PaginationRow/index';
import ManageManifestModal from './Manifest/';
import { columns } from './SubscriptionsTableSchema';
import Search from '../../components/Search/index';
import { orgId } from '../../services/api';
import SubscriptionDeleteModal from './SubscriptionDeleteModal';
import { BLOCKING_FOREMAN_TASK_TYPES, MANIFEST_TASKS_BULK_SEARCH_ID } from './SubscriptionConstants';

class SubscriptionsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      manifestModalOpen: false,
      subscriptionDeleteModalOpen: false,
      selectedRows: [],
    };

    bindMethods(this, [
      'onSelectRow',
      'modifySubscriptions',
      'onSelectAllRows',
    ]);
  }

  componentDidMount() {
    this.loadData();
  }

  onSelectAllRows(event) {
    const { checked } = event.target;
    const { subscriptions } = this.props;
    const subs = [...subscriptions.results];
    const allSubIds = subs.map(sub => sub.id);
    if (checked) {
      this.setState({
        selectedRows: allSubIds,
      });
    } else {
      this.setState({
        selectedRows: [],
      });
    }
  }

  onSelectRow(_event, row) {
    const { selectedRows } = this.state;
    if (selectedRows.includes(row.id)) {
      this.setState({
        selectedRows: selectedRows.filter(e => e !== row.id),
      });
    } else {
      selectedRows.push(row.id);
      this.setState({
        selectedRows,
      });
    }
  }

  loadData() {
    this.props.pollBulkSearch({
      search_id: MANIFEST_TASKS_BULK_SEARCH_ID,
      type: 'all',
      active_only: true,
      action_types: BLOCKING_FOREMAN_TASK_TYPES,
    }, 10000);
    this.props.loadSubscriptions();
  }

  modifySubscriptions() {
    const { subscriptions } = this.props;
    const { selectedRows } = this.state;
    const newSubscriptions = [];
    subscriptions.results.forEach((sub) => {
      if (selectedRows.includes(sub.id)) {
        const selectedRow = Object.assign({}, sub, { selected: true });
        newSubscriptions.push(selectedRow);
      } else {
        const unselectedRow = Object.assign({}, sub, { selected: false });
        newSubscriptions.push(unselectedRow);
      }
    });
    return newSubscriptions;
  }

  renderSubscriptionTable() {
    const { subscriptions } = this.props;

    const emptyStateData = () => ({
      header: __('There are no Subscriptions to display'),
      description: __('Add Subscriptions to this Allocation to manage your Entitlements.'),
      documentation: {
        title: __('Learn more about adding Subscriptions to Allocations'),
        url: 'http://redhat.com',
      },
      action: {
        title: __('Add Subscriptions'),
        url: 'subscriptions/add',
      },
    });

    const onPaginationChange = (pagination) => {
      this.props.loadSubscriptions({
        ...pagination,
      });
    };

    let bodyMessage;
    if (subscriptions.results.length === 0 && subscriptions.searchIsActive) {
      bodyMessage = __('No subscriptions match your search criteria.');
    }

    return (
      <Spinner loading={subscriptions.loading} className="small-spacer">
        <Table
          rows={this.modifySubscriptions()}
          columns={columns(this)}
          emptyState={emptyStateData()}
          bodyMessage={bodyMessage}
          onSelectAllRows={this.onSelectAllRows}
        />
        <PaginationRow
          viewType="table"
          itemCount={subscriptions.itemCount}
          pagination={subscriptions.pagination}
          onChange={onPaginationChange}
        />
      </Spinner>
    );
  }

  render() {
    const { tasks } = this.props;
    const taskInProgress = tasks.length > 0;

    const onSearch = (search) => {
      this.props.loadSubscriptions({ search });
    };

    const onSubscriptionDeleteModalClose = () => {
      this.setState({ subscriptionDeleteModalOpen: false });
    };

    const onDeleteSubscriptions = () => {
      this.props.deleteSubscriptions(this.state.selectedRows);
      onSubscriptionDeleteModalClose();
    };

    const getAutoCompleteParams = search => ({
      endpoint: '/subscriptions/auto_complete_search',
      params: {
        organization_id: orgId,
        search,
      },
    });

    const showManageManifestModal = () => {
      this.setState({ manifestModalOpen: true });
    };

    const onManageManifestModalClose = () => {
      this.setState({ manifestModalOpen: false });
    };

    const showSubscriptionDeleteModal = () => {
      this.setState({ subscriptionDeleteModalOpen: true });
    };

    return (
      <Grid bsClass="container-fluid">
        <Row>
          <Col sm={12}>
            <h1>{__('Red Hat Subscriptions')}</h1>

            <Row className="toolbar-pf table-view-pf-toolbar-external">
              <Col sm={12}>
                <Form className="toolbar-pf-actions">
                  <FormGroup className="toolbar-pf-filter">
                    <Search onSearch={onSearch} getAutoCompleteParams={getAutoCompleteParams} />
                  </FormGroup>

                  <div className="toolbar-pf-action-right">
                    <FormGroup>
                      <LinkContainer to="subscriptions/add">
                        <Button bsStyle="primary">
                          {__('Add Subscriptions')}
                        </Button>
                      </LinkContainer>

                      <Button disabled={taskInProgress}onClick={showManageManifestModal}>
                        {__('Manage Manifest')}
                      </Button>

                      <Button>
                        {__('Export CSV')}
                      </Button>

                      <Button
                        bsStyle="danger"
                        onClick={showSubscriptionDeleteModal}
                        disabled={taskInProgress || this.state.selectedRows.length <= 0}
                      >
                        {__('Delete')}
                      </Button>
                    </FormGroup>
                  </div>
                </Form>
              </Col>
            </Row>

            <ManageManifestModal
              showModal={this.state.manifestModalOpen}
              onClose={onManageManifestModalClose}
            />

            <SubscriptionDeleteModal
              showModal={this.state.subscriptionDeleteModalOpen}
              onClose={onSubscriptionDeleteModalClose}
              deleteSubscriptions={onDeleteSubscriptions}
              selectedRows={this.state.selectedRows}
            />

            { this.renderSubscriptionTable() }
          </Col>
        </Row>
      </Grid>
    );
  }
}

SubscriptionsPage.propTypes = {
  loadSubscriptions: PropTypes.func.isRequired,
  deleteSubscriptions: PropTypes.func.isRequired,
  subscriptions: PropTypes.shape({}).isRequired,
  pollBulkSearch: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({})),
};

SubscriptionsPage.defaultProps = {
  tasks: [],
};

export default SubscriptionsPage;
