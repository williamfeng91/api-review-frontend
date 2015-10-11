(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('apiservice', apiservice);

    /** @ngInject */
    function apiservice($http, $q, session, APISERVICE, logger) {
        var service = {
            create: createAPI,
            getById: getById,
            getPage: getPage,
            getAll: getAll,
            update: updateAPI,
            delete: deleteAPI
        };

        return service;
        /////////////////////

        /**
         * Creates a new API
         * @param api an api object that captures all details the API needs
         */
        function createAPI(api) {
            return $http({
                url: APISERVICE.apiUrl,
                method: 'POST',
                dataType: 'json',
                data: api,
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Retrieves an API
         * @param id the id of the API to be retrieved
         */
        function getById(id) {
            return $http({
                url: APISERVICE.apiUrl + id + '/',
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Retrieves a page of APIs
         * @param offset the starting index of APIs returned
         * @param limit the number of APIs returned
         */
        function getPage(offset, limit) {
            offset = typeof offset !== 'undefined' ? offset : 0;
            limit = typeof limit !== 'undefined' ? limit : session.getPageSize();
            return $http({
                url: APISERVICE.apiUrl + '?offset=' + offset + '&limit=' + limit,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Retrieves all APIs
         */
        function getAll() {
            return $http({
                url: APISERVICE.apiUrl,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Updates an API
         * @param api the api object with updated information
         */
        function updateAPI(api) {
            return $http({
                url: APISERVICE.apiUrl + api.id + '/',
                method: 'PUT',
                dataType: 'json',
                data: api,
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Deletes an API
         * @param id the id of the API to be deleted
         */
        function deleteAPI(id) {
            return $http({
                url: APISERVICE.apiUrl + id + '/',
                method: 'DELETE',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        // private functions
        function handleSuccess(response) {
            logger.success('API call successful', response, 'apiservice');
            return $q.resolve(response.data);
        }

        function handleError(response) {
            logger.error('API call unsuccessful', response, 'apiservice');
            return $q.reject(response);
        }
    }
}());
