(function () {
    'use strict';

    angular
        .module('himitsuApp')
        .controller(
        'AccountController', function ($state, $scope, userService,alertService) {


            $scope.isLogin = true;

            $scope.loginData = {
                email: 'yangmang@gmail.com',
                password: '123'
            };

            $scope.signupData = {
                image:'',
                email:'',
                password:'',
                password1:'',
                firstname:'',
                lastname:'',
                name:'',
                gender:'',
                birthdate:''
            }

            $scope.switchType = function(type){
                $scope.isLogin = (type==='login');
            }

            $scope.loginSubmit = function () {
                userService.postLogin($scope.loginData)
                    .then(function (res) {
                        if (res.result) {
                            //alert('OK');
                            userService.loadUser()
                                .then(function (userRes) {
                                    if (userRes.result) {
                                        $state.go('secret');
                                    }
                                });

                        } else {
                            alertService.alert('Himitsu',res.err.message);
                            //alert(res.err.message);
                        }

                    });

            };

            $scope.signupSubmit = function () {
                userService.postSignUp($scope.signupData)
                    .then(function(res){

                        console.log("controller");

                        if(res && res.result != false) {
                            console.log(res.data);

                            $state.go('login');
                        }else{
                            alert(res.err.message);
                        }
                    });
            };

            $scope.signup = function () {
                $state.go('signup'); 
            };


            $scope.size = null;

            $scope.users = [];


            $scope.random = function () {

                userService.searchUserByFirstName($scope.size)
                    .then(function (res) {
                        console.log(res);

                        if (res.result) {
                            $scope.users = res.data;
                        } else {
                            $scope.users = [];
                        }
                    });

            }
        });

})();