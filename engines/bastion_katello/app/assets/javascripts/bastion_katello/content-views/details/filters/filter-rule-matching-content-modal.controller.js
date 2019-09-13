/**
 * @ngdoc object
 * @name  Bastion.content-views.controller:FilterRuleMatchingContentModal
 *
 * @requires $scope
 * @requires $uibModalInstance
 * @requires rule
 *
 * @description
 *   A controller for providing matching filter rule modal
 */
angular.module('Bastion.content-views').controller('FilterRuleMatchingContentModal',
    ['$scope', '$uibModalInstance', 'rule',
        function ($scope, $uibModalInstance, rule) {
            $scope.rule = rule;

            $scope.cancel = function () {
                $uibModalInstance.close();
            };
        }
    ]
);
