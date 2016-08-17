(function () {

    angular.module('himitsuApp')
        .controller(
            'secretController',
            function ($state, $scope, secretService, userService, $localStorage) {

                // $scope.convertToSpan = function(stringDate){
                //     var dateOut = new Date(stringDate);
                //     dateOut.setDate(dateOut.getDate()+1);
                //     return dateOut;
                // }

                $scope.mySecret = false;
                $scope.secretData = [];

                $scope.secretOne = {
                    content: '',
                    isPublic: true,
                    //  isAnonymous:'',
                    username: $localStorage.userId,
                    images:''
                };

                $scope.forwardSecret = {
                    content: '',
                    username: $localStorage.userId,
                    forwards: '',
                 //   referId: ''
                };

                $scope.getSecretList = function () {

                    secretService.getSecret($scope.secretData)
                        .then(function (res) {
                            if (res) {
                                $scope.secretData = res;
                                console.log(res + "information test");
                            } else {
                                alert(res.err);
                            }
                        });

                };


                $scope.getSecretList();

                $scope.secretLikesNumber = function () {
                    return $scope.secretData;
                };

                $scope.userId = userService.getUserId();

                $scope.user = $localStorage.user;

                $scope.createSecret = function () {

                    secretService.postSecret($scope.secretOne)
                        .then(function (res) {
                            console.log(res);
                            if (res && res.result != false) {
                                alert('secret send successfully!');
                                $scope.secretOne.content = '';
                                $scope.secretOne.images = '';
                                
                                // console.log(images);

                                $scope.getSecretList();
                            } else {
                                alert(res.err);
                            }
                        });
                };

                $scope.createForward = function () {
                    secretService.postSecret($scope.secretOne)
                        .then(function (res) {
                            if (res) {
                                alert('Forward success');
                                $scope.forwardSecret.content = '';
                                $scope.forwardSecret.forwards = '';
                             //   $scope.referId = '';
                                $scope.getSecretList();
                                
                                }
                             else {
                                alert(res.error);
                            };
                        });
                };

                $scope.logout = function () {
                    $localStorage.$reset();
                    $state.go('login');
                };
                $scope.contact = function() {
                    $state.go('contact');
                };

            });

})();