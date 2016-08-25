(function () {

    angular
        .module('himitsuApp')
        .factory('alertService', function () {

            var alertService = this;

            alertService.alertData = {
                title: "Alert Message",
                content: 'Content',
                mode: 'alert'
                // btn1: '',
                // btn2: '',
            }

            var animationsEnabled = true;

            alertService.open = function (mode) {

                var modalInstance = $scope.open({
                    animation: animationsEnabled,
                    templateUrl:
                    // 'views/alert.html'
                    <div>
                        <script type="text/ng-template" id="alert.html">
                            <div class="modal-body">
                                {{ Title }} {{ content }}
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>
                                <button class="btn btn-primary" type="button" ng-click="commentSubmit()">Ok</button>
                            </div>
                        </script>
                    </div>,
                    controller: 'alertInstanceCtrl',
                    size: 'md',
                    resolve: {
                        data: function () {
                            return $scope.data;
                        }
                    }
                });
            };
            return this;

        });

    angular.module('himitsuApp').controller('alertInstanceCtrl', function ($scope, $uiModalInstance, data) {

        $scope.data = data;

        $scope.alert = function (data) {
            $scope.data.title = data.title;
            $scope.data.content = data.content;
        }

        $scope.toast = function (data) {
            $scope.data.title = data.title;
            $scope.data.content = data.content;
            $scope.mode = 'toast';

        }

        $scope.confirm = function (data) {
            $scope.data.title = data.title;
            $scope.data.content = data.content;
            $scope.mode = 'confirm';
        }
    })
})();