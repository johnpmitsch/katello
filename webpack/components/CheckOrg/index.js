import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CheckOrg from "./CheckOrg";
import * as organizationActions from '../../scenes/Organizations/OrganizationActions';

const mapStateToProps = state => ({
  organization: state.katello.organization,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...organizationActions }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckOrg));