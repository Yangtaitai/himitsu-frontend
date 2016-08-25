(function () {

    angular
        .module('himitsuApp')
        .factory('alertService', function ($uibModal) {

            var alertService = this;

            // var title;
            // var content;
            var data = {
                title:'',
                content:''
            }

            alertService.alert = function (title,content) {

                var animationsEnabled = true;

                alertService.alertModal = function (data) {

                    var modalInstance = $uibModal.open({
                        animation: animationsEnabled,
                        templateUrl: '/views/modals/_modal-alert.html',
                        controller: 'alertInstanceCtrl',
                        size: 'md',
                        resolve: {
                            data: function () {
                                return data;
                            }
                        }
                    });
                };
                console.log(title);
                console.log(content);

                alertService.title = title;
                alertService.content = content;
            }

            alertService.toast = function (title,content) {
                
                var animationsEnabled = true;

                alertService.alertModal = function (data) {

                    var modalInstance = $uibModal.open({
                        animation: animationsEnabled,
                        templateUrl: '/views/modals/_modal-confirm.html',
                        controller: 'alertInstanceCtrl',
                        size: 'md',
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

            alertService.confirm = function (title, content) {

                var animationsEnabled = true;

                alertService.alertModal = function (data) {

                    var modalInstance = $uibModal.open({
                        animation: animationsEnabled,
                        templateUrl: '/views/modals/_modal-confirm.html',
                        controller: 'alertInstanceCtrl',
                        size: 'md',
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