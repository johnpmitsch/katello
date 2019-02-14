import React from 'react';
import CheckOrg from '../CheckOrg';

const withOrganization = (WrappedComponent, redirectPath) => (
  <CheckOrg redirectPath={redirectPath}><WrappedComponent /></CheckOrg>
)

export default withOrganization;
