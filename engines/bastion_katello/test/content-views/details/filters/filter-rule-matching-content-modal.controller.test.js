describe('Controller: FilterRuleMatchingContentModal', function() {
  var $scope, $uibModalInstance, rule;

  beforeEach(module('Bastion.content-views'));

  beforeEach(function() {
      $uibModalInstance = {
          close: function () {},
          dismiss: function () {}
      }

      rule = {
        'matching_content': ["foo"]
      }
  });

  beforeEach(inject(function(_Notification_, $controller, $rootScope, _$q_) {
      $scope = $rootScope.$new();
      $controller('FilterRuleMatchingContentModal', {
          $scope: $scope,
          $uibModalInstance: $uibModalInstance,
          rule: rule
      });
  }));

  it("provides a function for closing the modal", function () {
      spyOn($uibModalInstance, 'close');
      $scope.cancel();
      expect($uibModalInstance.close).toHaveBeenCalled();
  });
});