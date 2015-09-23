(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('authservice', authservice);

    /** @ngInject */
    function authservice($http, session, logger, APISERVICE) {
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
                url: APISERVICE.url + '/login',
                method: 'POST',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
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
