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
                images: ''
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
                            console.log(res);
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
            $scope.contact = function () {
                $state.go('contact');
            };

        });

})();

angular.module('himitsuApp').controller('CommentCtrl', function ($scope, $uibModal, $log) {

    $scope.animationsEnabled = true;

    $scope.open = function () {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'commentContent.html',
            controller: 'CommentInstanceCtrl',
            resolve: {
                secret: function () {
                    return $scope.secret;
                }
            }
        });
    };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('himitsuApp').controller('CommentInstanceCtrl', function ($scope, secretService, userService, $uibModalInstance, secret, $localStorage) {

    $scope.userId = userService.getUserId();

    $scope.user = $localStorage.user;

    $scope.secret = secret;

    $scope.commentData = {
        owner: $localStorage.userId,
        content: '',
        secret: $scope.secret._id
    }
    $scope.selected = {
        item: $scope.secret[0]
    };

    $scope.commentSubmit = function () {
        secretService.postComment($scope.commentData)
            .then(function (res) {
                // console.log(secret._id);
                // console.log(res);
                if (res && res.result != false) {
                    alert('Comment send successful !');

                    $scope.commentData.content = '';
                    // $scope.commentData.secret = secret._id;
                } else {
                    alert(res.err);
                }
            })
    };

    $scope.getCommentList = function () {

        secretService.getComment($scope.commentData)
            .then(function (res) {
                if (res) {
                    $scope.commentData = res;
                    console.log(res);
                } else {
                    alert(res.err);
                }
            });

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});