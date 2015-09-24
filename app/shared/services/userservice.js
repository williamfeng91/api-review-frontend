(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('userservice', userservice);

    /** @ngInject */
    function userservice($http, $q, session, logger, APISERVICE) {
        var service = {
            getAll: getAll,
            getById: getById,
            create: createUser,
            update: updateUser,
            delete: deleteUser
        };

        return service;
        /////////////////////

        function getAll() {
            return $http({
                url: APISERVICE.userUrl,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        function getById(id) {
            return $http({
                url: APISERVICE.userUrl + '/' + id,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        function createUser(user) {
            return $http({
                url: APISERVICE.userUrl,
                method: 'POST',
                dataType: 'json',
                data: user,
                headers: APISERVICE.headers
            }).then(createUserComplete, handleError);

            function createUserComplete(response) {
                logger.success(
                    'User ' + user.username + ' successfully created',
                    response,
                    'userservice.create');
            }
        }

        function updateUser(user) {
            return $http({
                url: APISERVICE.userUrl + '/' + id,
                method: 'PUT',
                dataType: 'json',
                data: user,
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

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
