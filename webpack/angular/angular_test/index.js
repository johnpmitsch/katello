import angular from 'angular'
import uirouter from 'angular-ui-router'
import routes from './angularTest.routes.js'

export default angular.module('bastion.angularTest', [uirouter]).config(routes).name;