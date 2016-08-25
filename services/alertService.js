(function () {

    angular
        .module('himitsuApp')
        .factory('alertService', function ($uibModal) {

            var alertService = this;

            var title;
            var content;

            alertService.alert = function (title,content) {

                var animationsEnabled = true;

                alertService.alertModal = function (title,content) {

                    var modalInstance = $uibModal.open({
                        animation: animationsEnabled,
                        templateUrl: '/views/modals/_modal-alert.html',
                        controller: 'alertInstanceCtrl',
                        size: 'md',
                        mode: mode,
                        resolve: {
                            data: function () {
                                return data;
                            }
                        }
                    });
                };
                alertService.title = title;
                alertService.data.content = content;
            }

            alertService.toast = function () {

            }

            alertService.confirm = function (title, content) {

                var animationsEnabled = true;

                alertService.alertModal = function (title,content) {

                    var modalInstance = $uibModal.open({
                        animation: animationsEnabled,
                        templateUrl: '/views/modals/_modal-confirm.html',
                        controller: 'alertInstanceCtrl',
                        size: 'md',
                        mode: mode,
                        resolve: {
                            data: function () {
                                return data;
                            }
                        }
                    });
                };
                alertService.title = title;
                alertService.content = content;
            }

                return this;
        });
})();

 angular.module('himitsuApp').controller('alertInstanceCtrl',function(){

 });