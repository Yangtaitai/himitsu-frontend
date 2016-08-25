(function () {

    angular
        .module('himitsuApp')
        .factory('userService', function ($http, $HOST, $localStorage) {

            var userService = this;

            userService.userId = null;

            userService.postLogin = function (data) {
                
                console.log(data);

                return $http.post($HOST.url + '/login', data)
                    .then(function (res) {

                        if (res.data) {

                            if (res.data.result) {

                                userService.userId = res.data.data.id;
                                $localStorage.userId = res.data.data.id;

                            }

                            return res.data;

                        } else {

                            return { result: false };
                        }
                    });
            };

            userService.postSignUp = function (data) {

                return $http.post($HOST.url + '/user', data)
                    .then(function (res) {

                        console.log('service');

                        console.log(res.data);

                        console.log('Sign up post!!!');

                        if (res.data) {
                            console.log(res.data);
                            return res.data;

                        } else {
                            return {
                                result: false
                            };
                        };
                    });
            };

            userService.loadUser = function () {
                return $http.get($HOST.url + '/user/' + $localStorage.userId)
                    .then(function (res) {
                        if (res.data) {
                            if (res.data.result) {
                                $localStorage.user = res.data.data;
                            }

                            return res.data;
                        } else {
                            return { result: false };
                        }
                    })
            };


            userService.getUserId = function () {
                return $localStorage.userId;
            };

            userService.getUser = function () {
                return $localStorage.user;
            };

            userService.searchUserByFirstName = function (keyword) {
                if (!keyword)
                    keyword = "";
                return $http.get($HOST.url + '/user?firstName=' + keyword)
                    .then(function (res) {

                        if (res.data)

                            return res.data;
                        else
                            return {
                                result: false,
                                data: null,
                                err: 'NO_DATA'
                            };


                    }, function (res) {
                        return {
                            result: false,
                            data: 'error'
                        }
                    });
            }

            return this;
        });

})();