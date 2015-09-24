(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('userservice', userservice);

    /** @ngInject */
    function userservice($http, $q, session, logger, APISERVICE) {
        var service = {
            create: createUser,
            getById: getById,
            getAll: getAll,
            update: updateUser,
            delete: deleteUser
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
         * Retrieves a user
         * @param id the id of the user to be retrieved
         */
        function getById(id) {
            return $http({
                url: APISERVICE.userUrl + '/' + id,
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
            limit = typeof limit !== 'undefined' ? limit : 20;
            var url = APISERVICE.userUrl + '?offset=' + offset + '&limit=' + limit;
            if (typeof userType !== 'undefined') {
                url += '&userType=' + encodeURIComponent(userType),
            }
            return $http({
                url: url,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleFailure);
        }

        /**
         * Retrieves all users
         * @param userType the type of user to be returned
         */
        function getAll(userType) {
            var url = APISERVICE.userUrl;
            if (typeof userType !== 'undefined') {
                url += '?userType=' + encodeURIComponent(userType),
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
                url: APISERVICE.userUrl + '/' + user.id,
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
                url: APISERVICE.userUrl + '/' + id,
                method: 'DELETE',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        // private functions
        function handleSuccess(response) {
            return response.data;
        }

        function handleError(response) {
            return $q.reject(response);
        }
    }
}());
