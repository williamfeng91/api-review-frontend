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
            logger.info('Session created for user ' + user.username, this.currentUser, 'session.create');
        }

        this.destroy = function () {
            this.currentUser = null;
            $http.defaults.headers.common.Authorization = 'Basic ';
            $cookieStore.remove('currentUser');
            logger.info('Session destroyed', this.currentUser, 'session.destroy');
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
