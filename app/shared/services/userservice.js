(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('userservice', userservice);

    /** @ngInject */
    function userservice($http, $q, session, logger, APISERVICE) {
        var service = {
            create: createUser,
            register: register,
            getById: getById,
            getPage: getPage,
            getAll: getAll,
            update: updateUser,
            delete: deleteUser,
            resetPassword: resetPassword
        };

        return service;
        /////////////////////

        /**
         * Creates a new user
         * @param user a user object that captures all details the API needs
         */
        function createUser(user) {
            return $http({
                url: APISERVICE.userUrl,
                method: 'POST',
                dataType: 'json',
                data: user,
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * User registration
         * @param user a user object that captures all details the API needs
         */
        function register(user) {
            user.role = "reader";
            return $http({
                url: APISERVICE.userUrl,
                method: 'POST',
                dataType: 'json',
                data: user,
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Retrieves a user
         * @param id the id of the user to be retrieved
         */
        function getById(id) {
            return $http({
                url: APISERVICE.userUrl + id + '/',
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Retrieves a page of users
         * @param offset the starting index of users returned
         * @param limit the number of users returned
         * @param userType the type of user to be returned
         */
        function getPage(offset, limit, userType) {
            offset = typeof offset !== 'undefined' ? offset : 0;
            limit = typeof limit !== 'undefined' ? limit : session.getPageSize();
            var url = APISERVICE.userUrl + '?offset=' + offset + '&limit=' + limit;
            if (typeof userType !== 'undefined') {
                url += '&userType=' + encodeURIComponent(userType);
            }
            return $http({
                url: url,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Retrieves all users
         * @param userType the type of user to be returned
         */
        function getAll(userType) {
            var url = APISERVICE.userUrl;
            if (typeof userType !== 'undefined') {
                url += '?userType=' + encodeURIComponent(userType);
            }
            return $http({
                url: url,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Updates a user's profile
         * @param user the user object with updated information
         */
        function updateUser(user) {
            return $http({
                url: APISERVICE.userUrl + user.id + '/',
                method: 'PUT',
                dataType: 'json',
                data: user,
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Deletes a user
         * @param id the id of the user to be deleted
         */
        function deleteUser(id) {
            return $http({
                url: APISERVICE.userUrl + id + '/',
                method: 'DELETE',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Resets a user's password
         * @param request a request object required by the API
         */
        function resetPassword(email) {
            var request = {
                'email': email
            };
            return $http({
                url: APISERVICE.userUrl + 'reset-password/',
                method: 'POST',
                dataType: 'json',
                data: request,
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        // private functions
        function handleSuccess(response) {
            logger.success('API call successful', response, 'userservice');
            return $q.resolve(response.data);
        }

        function handleError(response) {
            logger.error('API call unsuccessful', response, 'userservice');
            return $q.reject(response);
        }
    }
}());
