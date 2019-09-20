/* eslint import/no-unresolved: [2, { ignore: [foremanReact/*] }] */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import componentRegistry from 'foremanReact/components/componentRegistry';
import Application from './containers/Application/index';
import angular from 'angular';
import './redux';
// Not currently mocking anything
// import './services/api/setupMocks';

componentRegistry.register({
  name: 'katello',
  type: Application,
});

angular.element(document).ready(function () {
    angular.bootstrap(document, BASTION_MODULES);
});

BASTION_MODULES = [
    'angular-blocks',
    'ngAnimate',
    'ngSanitize',
    'templates',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'Bastion.auth',
    'Bastion.menu',
    'Bastion.i18n',
    'Bastion.features',
    'Bastion.routing'
];
