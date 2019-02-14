import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash/get';

import { translate as __ } from 'foremanReact/common/I18n';
import Header from '../../containers/Application/Headers';
import SetOrganization from '../SelectOrg/SetOrganization';

class CheckOrg extends Component {
  constructor(props) {
    super(props);
    this.state = { orgId: null };
  }
  static getDerivedStateFromProps(newProps, state) {
    const orgNodeId = document.getElementById('organization-id').dataset.id;

    if (state.orgId !== orgNodeId) {
      return { orgId: orgNodeId };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const orgTitle = get(location, 'state.orgChanged');
    const prevOrgTitle = get(prevProps, 'location.state.orgChanged');

    if (orgTitle !== prevOrgTitle) {
      window.tfm.nav.changeOrganization(orgTitle);
    }
  }

  render() {
    const { organization, location } = this.props;
    const newOrgSelected = get(location, 'state.orgChanged');

    console.log(this.props.children);
    if (newOrgSelected) {
      if (!organization.label && !organization.loading) { this.props.loadOrganization(); }

      return React.cloneElement(this.props.children, this.props)
    } else if (this.state.orgId === '') {
      return (
        <React.Fragment>
          <Header title={__('Select Organization')} />
          <SetOrganization redirectPath={this.props.redirectPath} />
        </React.Fragment>);
    }

    return React.cloneElement(this.props.children, this.props)
  }
}

CheckOrg.propTypes = {
  location: PropTypes.shape({}),
  loadOrganization: PropTypes.func.isRequired,
  organization: PropTypes.shape({}).isRequired,
};

CheckOrg.defaultProps = {
  location: undefined,
};

export default CheckOrg;