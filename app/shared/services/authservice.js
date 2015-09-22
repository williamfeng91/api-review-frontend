(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('authservice', authservice);

    /** @ngInject */
    function authservice($http, session, logger) {
        var service = {
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
            isAuthorised: isAuthorised
        };

        return service;
        /////////////////////

        function login(credentials, callback) {
            return $http({
                url: 'http://jsonstub.com/login',
                method: 'POST',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json',
                    'JsonStub-User-Key': '51ec5e27-c872-4a8e-8070-dec92f5fca8f',
                    'JsonStub-Project-Key': 'deeec676-1dad-4086-a1f0-ead970151994'
                }
            }).then(loginComplete);

            function loginComplete(response) {
                var user = response.data;
                session.create(user);
                logger.success('User ' + user.username + ' successfully logged in', response);
                callback(response);
            }
        }

        function logout() {
            return $http
                .post('/logout', {})
                .then(logoutComplete);

            function logoutComplete(response) {
                session.destroy();
                logger.success('User ' + user.username + ' successfully logged out');
            }
        }

        function isAuthenticated() {
            return !!session.getCurrentUser();
        }

        function isAuthorised(roles) {
            if (!angular.isArray(roles)) {
              roles = [roles];
            }
            return service.isAuthenticated()
                && roles.indexOf(session.getUserRole()) !== -1;
        }
    }
}());
