(function() {

    angular
        .module('himitsuApp')
        .factory('alertService', function($uibModal) {

            var alertService = this;

            var data = {
                title: '',
                content: ''
            }

            alertService.alert = function(content, title) {

                var animationsEnabled = true;

                var modalInstance = $uibModal.open({
                    animation: animationsEnabled,
                    templateUrl: '/views/modals/_modal-alert.html',
                    controller: 'alertInstanceCtrl',
                    size: 'md',
                    resolve: {
                        data: function() {
                            return {
                                title: title ? title : 'Himitsu',
                                content: content
                            };
                        }
                    }
                });

                return modalInstance.result;
            }

            alertService.confirmModal = function(content, title) {

                var animationsEnabled = true;

                var modalInstance = $uibModal.open({
                    animation: animationsEnabled,
                    templateUrl: '/views/modals/_modal-confirm.html',
                    controller: 'alertInstanceCtrl',
                    size: 'md',
                    resolve: {
                        data: function() {
                            return {
                                title: title ? title : 'Himitsu',
                                content: content
                            };
                        }
                    }
                });

                return modalInstance.result;
            }

            alertService.toast = function(title, content) {}

            return this;
        });
})();

angular.module('himitsuApp').controller('alertInstanceCtrl', function(alertService, $scope, $uibModalInstance, data) {
    $scope.data = data;

    $scope.close = function() {
        $uibModalInstance.close();
    }
});