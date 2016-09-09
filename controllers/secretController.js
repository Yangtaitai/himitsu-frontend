(function() {

    angular.module('himitsuApp')
        .controller(
            'secretController',
            function($state, $scope, secretService, userService, $localStorage, $uibModal, $log, FileUploader, alertService, $HOST) {

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
                    images: []
                };

                $scope.getImageUrl = function(image) {
                    if (image)
                        return $HOST.url + '/images/' + image;
                    else
                        return null;
                };

                $scope.getImageUrls = function(secret) {
                    var slides = [];

                    for (var i = 0; i < secret.images.length; i++) {
                        if (secret.images[i]) {
                            slides.push({
                                image: $HOST.url + '/images/' + secret.images[i],
                                text: '',
                                id: slides.length
                            });
                        }
                    }

                    secret.slides = slides;

                    return slides;
                };

                $scope.forwardSecret = {
                    content: '',
                    username: $localStorage.userId,
                    forwards: '',
                    //   referId: ''
                };

                $scope.getSecretList = function() {

                    secretService.getSecret()
                        .then(function(res) {
                            if (res) {
                                $scope.secretData = res;
                                for (var i = 0; i < $scope.secretData.length; i++) {
                                    $scope.getImageUrls($scope.secretData[i]);
                                }

                                console.log($scope.secretData);

                            } else {
                                alertService.alert(res.err);
                            }
                        });

                };


                $scope.getSecretList();

                $scope.secretLikesNumber = function() {
                    return $scope.secretData;
                };

                $scope.userId = userService.getUserId();

                $scope.user = $localStorage.user;

                $scope.createSecret = function() {
                    if ($scope.uploader.queue.length > 0) {
                        $scope.secretOne.images = [];
                        for (var i = 0; i < $scope.uploader.queue.length; i++) {
                            console.log($scope.uploader.queue[i].upload());
                        }
                    } else {
                        $scope.createSecretSubmit();
                    }

                };

                $scope.createSecretSubmit = function() {
                    secretService.postSecret($scope.secretOne)
                        .then(function(res) {
                            console.log(res);
                            if (res && res.result != false) {
                                alertService.alert('Secret send successfully!');
                                $scope.secretOne.content = '';
                                $scope.secretOne.images = [];

                                // console.log(images);

                                $scope.getSecretList();
                            } else {
                                alertService.alert(res.err);
                            }
                        });
                }

                $scope.createForward = function() {
                    secretService.postSecret($scope.secretOne)
                        .then(function(res) {
                            if (res) {
                                alertService.alert('Forward success');
                                $scope.forwardSecret.content = '';
                                $scope.forwardSecret.forwards = '';
                                //   $scope.referId = '';
                                $scope.getSecretList();

                            } else {
                                alertService.alert(res.error);
                            };
                        });
                };

                $scope.favorite = function() {

                }

                $scope.getCommentList = function(secret) {
                    var comments = "comments";
                    if (!secret.hasOwnProperty(comments)) {
                        secretService.getCommentList(secret._id)
                            .then(function(res) {
                                if (res.result) {
                                    secret.comments = res.data;
                                }
                            });
                    }
                }


                $scope.logout = function() {
                    $localStorage.$reset();
                    $state.go('login');
                };
                $scope.contact = function() {
                    $state.go('contact');
                };

                $scope.animationsEnabled = true;

                $scope.showCommentModal = function(secret) {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: '/views/modals/_modal-comment-content.html',
                        controller: 'CommentInstanceCtrl',
                        resolve: {
                            secret: function() {
                                return secret;
                            }
                        }
                    });
                };

                $scope.uploader = new FileUploader({
                    url: $HOST.url + '/upload',
                    onCompleteAll: function() {
                        console.log('photo upload');
                        if ($scope.secretOne.images.length == $scope.uploader.queue.length) {
                            $scope.createSecretSubmit();
                        } else {
                            alertService.alert('?');
                        }

                    },
                    onCompleteItem: function(item, res, status, header) {
                        // console.log(res);
                        if (res.result) {
                            $scope.secretOne.images.push(res.data);
                            console.log(res.data);
                        }
                    }
                });

            });


})();


angular.module('himitsuApp').controller('CommentInstanceCtrl', function($scope, secretService, userService, $uibModalInstance, secret, $localStorage, alertService) {

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

    $scope.commentSubmit = function() {
        secretService.postComment($scope.commentData)
            .then(function(res) {
                // console.log(secret._id);
                // console.log(res);
                if (res && res.result != false) {
                    alertService.alert('Comment send successful !');

                    $scope.commentData.content = '';
                    // $scope.commentData.secret = secret._id;

                    // $scope.getCommentList();
                    $uibModalInstance.close($scope.selected.item);
                } else {
                    alertService.alert(res.err);
                }
            });
    };

    $scope.getCommentList = function() {

        secretService.getComment($scope.commentData)
            .then(function(res) {
                if (res) {
                    $scope.commentData = res;
                    console.log(res);
                } else {
                    alertService.alert(res.err);
                }
            });

    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});