angular.element(document).ready(function () {
    angular.bootstrap(document, BASTION_MODULES);
});

const BASTION_MODULES = [
    'angular-blocks',
    'ngAnimate',
    'ngSanitize',
    'templates',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'Bastion.auth',
    'Bastion.components',
    'Bastion.menu',
    'Bastion.i18n',
    'Bastion.features',
    'Bastion.routing'
];
