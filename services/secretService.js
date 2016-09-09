(function() {

    angular
        .module('himitsuApp')
        .factory('secretService', function($HOST, $http, $localStorage, $timeout) {


            var secretService = this;

            this.getSecret = function() {

                return $http.get($HOST.url + '/secret')
                    .then(function(res) {
                        console.log(res.data.data);

                        if (res.data.data) {

                            return res.data.data;

                        } else {
                            return {
                                result: false
                            };
                        };
                    });

            }

            this.postSecret = function(data) {

                return $http.post($HOST.url + '/secret', data)
                    .then(function(res) {

                        console.log(res.data);

                        if (res.data)
                            return res.data;
                        else
                            return {
                                result: false
                            };
                    });
            };

            this.postComment = function(data) {
                return $http.post($HOST.url + '/comment', data)
                    .then(function(res) {
                        console.log(res.data);

                        console.log($localStorage.userId);

                        if (res.data)
                            return res.data;
                        else
                            return {
                                result: false
                            };
                    });

            };

            this.getCommentList = function(id) {

                return $http.get($HOST.url + '/comment?secret=' + id)
                    .then(function(res) {

                        console.log("comment test");

                        if (res.data) {

                            return $timeout(function() {
                                return res.data
                            }, 1000);

                        } else {
                            return {
                                result: false
                            };
                        };
                    });
            }

            return this;
        });

})();