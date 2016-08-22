(function () {
    
    // var host = 'http://topsecret.today:4000';

    angular.module('himitsuApp', [
        'ui.bootstrap', 'ui.router', 'ngStorage'
    ])
        .constant('$HOST',{
            'url':'http://topsecret.today:4000'
        })
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/login');
            $stateProvider
                .state('login', {
                    url: '/login',
                    controller: 'AccountController',
                    templateUrl: '/views/login.html'

                })
                .state('signup', {
                    url: '/signup',
                    controller: 'AccountController',
                    templateUrl: '/views/login.html'
                })
                .state('secret', {
                    url: '/secret',
                    controller: 'secretController',
                    templateUrl: '/views/secret.html'
                });
        
        })
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.withCredentials = true;
        }]);
})();