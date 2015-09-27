(function() {
    'use strict';

    angular
        .module('app.services')
        .service('session', session);

    /** @ngInject */
    function session($cookieStore, logger) {
        this.currentUser = null;
        this.currentReview = null;

        this.create = function (user) {
            this.currentUser = user;
            $cookieStore.put('currentUser', user);
            logger.info('Session created for user ' + user.email, this.currentUser, 'session.create');
        }

        this.destroy = function () {
            this.currentUser = null;
            this.currentReview = null;
            $cookieStore.remove('currentUser');
            $cookieStore.remove('currentReview');
            logger.info('Session destroyed', this.currentUser, 'session.destroy');
        }

        // Current user
        this.getCurrentUser = function () {
            return this.currentUser;
        }

        // for OAuth
        // this.getAuthData = function () {
        //     return this.currentUser ? this.currentUser.auth_data : {};
        // }

        this.getUserRole = function () {
            return this.currentUser ? this.currentUser.user_role : '';
        }

        // Current review
        this.getCurrentReview = function () {
            return this.currentReview;
        }

        this.setCurrentReview = function (review) {
            this.currentReview = review;
            $cookieStore.put('currentReview', this.currentReview);
            logger.info('Review stored in session', this.currentReview, 'session.setCurrentReview');
        }
    }
}());
