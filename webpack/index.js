/* eslint import/no-unresolved: [2, { ignore: [foremanReact/*] }] */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import componentRegistry from 'foremanReact/components/componentRegistry';
import Application from './containers/Application/index';
import angular from 'angular'
import uirouter from 'angular-ui-router'
import routes from './angular/app.routes'
import angularTest from './angular/angular_test'
import bastionComponents from './angular/bastion/components'
import './redux';
// Not currently mocking anything
// import './services/api/setupMocks';

componentRegistry.register({
  name: 'katello',
  type: Application,
});

const ANGULAR_MODULES = [
  uirouter,
  angularTest,
  bastionComponents
];

angular.module('Bastion', ANGULAR_MODULES)
       .config(routes)