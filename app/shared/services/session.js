(function() {
    'use strict';

    angular
        .module('app.services')
        .service('session', session);

    /** @ngInject */
    function session($cookieStore, logger) {
        this.create = function (user) {
            this.currentUser = user;
            $cookieStore.put('currentUser', user);
            logger.info('Session created for user ' + user.username, this.currentUser, 'session.create');
        }

        this.destroy = function () {
            this.currentUser = null;
            $cookieStore.remove('currentUser');
            logger.info('Session destroyed', this.currentUser, 'session.destroy');
        }

        this.getCurrentUser = function () {
            return this.currentUser;
        }

        // for OAuth
        this.getAuthData = function () {
            return this.currentUser ? this.currentUser.auth_data : {};
        }

        this.getUserRole = function () {
            return this.currentUser ? this.currentUser.user_role : '';
        }
    }
}());
