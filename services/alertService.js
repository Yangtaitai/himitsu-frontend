(function () {

    angular
        .module('himitsuApp')
        .factory('alertService', function ($uibModal) {

            var alertService = this;

            alertService.alertData = {
                title: "Alert Message",
                content: 'Content',
                mode: 'alert'
                // btn1: '',
                // btn2: '',
            }

            var animationsEnabled = true;

            alertService.open = function (data) {

                var modalInstance = $uibModal.open({
                    animation: animationsEnabled,
                    ariaLabelledBy: 'modal-title',

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

            alertService.data = data;

            alertService.alert = function (data) {
                alertService.data.title = data.title;
                alertService.data.content = data.content;
            }

            alertService.toast = function (data) {
                alertService.data.title = data.title;
                alertService.data.content = data.content;
                alertService.mode = 'toast';

            }

            alertService.confirm = function (data) {
                alertService.data.title = data.title;
                alertService.data.content = data.content;
                alertService.mode = 'confirm';
            }
        })

        return this;
})();