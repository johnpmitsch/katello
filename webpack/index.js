/* eslint import/no-unresolved: [2, { ignore: [foremanReact/*] }] */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import componentRegistry from 'foremanReact/components/componentRegistry';
import Application from './containers/Application/index';
import angular from 'angular';
import 'angular-blocks';
import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';
import angularUiBootstrap from 'angular-ui-bootstrap';
import './redux';
// Not currently mocking anything
// import './services/api/setupMocks';

componentRegistry.register({
  name: 'katello',
  type: Application,
});

const BASTION_MODULES = [
    'angular-blocks',
    ngAnimate,
    ngSanitize,
    angularUiBootstrap,
    'Bastion.auth',
    'Bastion.menu',
    'Bastion.i18n',
    'Bastion.features',
    'Bastion.routing',
    'Bastion.capsule-content',
    'Bastion.activation-keys',
    'Bastion.architectures' ,
    'Bastion.common',
    'Bastion.content-views',
    'Bastion.content-views.versions',
    'Bastion.debs',
    'Bastion.docker-tags',
    'Bastion.files',
    'Bastion.ansible-collections',
    'Bastion.ostree-branches',
    'Bastion.hosts',
    'Bastion.puppet-modules',
    'Bastion.ostree-branches',
    'Bastion.module-streams',
    'Bastion.environments',
    'Bastion.content-credentials',
    'Bastion.hosts',
    'Bastion.capsules',
    'Bastion.organizations',
    'Bastion.products',
    'Bastion.repositories',
    'Bastion.subscriptions',
    'Bastion.sync-plans',
    'Bastion.http-proxies',
    'Bastion.host-collections',
    'Bastion.content-hosts',
    'Bastion.tasks',
    'Bastion.settings'
];

angular.module('Bastion', BASTION_MODULES);
