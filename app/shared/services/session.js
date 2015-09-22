(function() {
    'use strict';

    angular
        .module('app.services')
        .service('session', session);

    /** @ngInject */
    function session($http, $cookieStore, logger) {
        this.create = function (user) {
            this.currentUser = user;
            $http.defaults.headers.common['Authorization'] = 'Basic ' + user.auth_data; // jshint ignore:line
            $cookieStore.put('currentUser', user);
            logger.success('Session created for user ' + user.username);
        }

        this.destroy = function () {
            this.currentUser = null;
            $http.defaults.headers.common.Authorization = 'Basic ';
            $cookieStore.remove('currentUser');
            logger.success('Session destroyed');
        }

        this.getCurrentUser = function () {
            return this.currentUser;
        }

        this.getAuthData = function () {
            return this.currentUser ? this.currentUser.auth_data : {};
        }

        this.getUserRole = function () {
            return this.currentUser ? this.currentUser.user_role : '';
        }
    }
}());
