(function() {

    angular
        .module('himitsuApp')
        .factory('alertService', function($uibModal) {

            var alertService = this;

            var data = {
                title: '',
                content: ''
            }

            alertService.alert = function(title, content) {

                var animationsEnabled = true;

                var modalInstance = $uibModal.open({
                    animation: animationsEnabled,
                    templateUrl: '/views/modals/_modal-alert.html',
                    controller: 'alertInstanceCtrl',
                    size: 'md',
                    resolve: {
                        data: function() {
                            return {
                                title: title,
                                content: content
                            };
                        }
                    }
                });

                console.log(data);
            }

            alertService.confirmModal = function(title, content) {

                var animationsEnabled = true;

                var modalInstance = $uibModal.open({
                    animation: animationsEnabled,
                    templateUrl: '/views/modals/_modal-confirm.html',
                    controller: 'alertInstanceCtrl',
                    size: 'md',
                    resolve: {
                        data: function() {
                            return {
                                title: title,
                                content: content
                            };
                        }
                    }
                });
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