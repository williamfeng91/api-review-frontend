(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('reviewservice', reviewservice);

    /** @ngInject */
    function reviewservice($http, $q, APISERVICE) {
        var service = {
            create: createReview,
            getById: getById,
            getByAPI: getByAPI,
            getByReviewer: getByReviewer,
            getPage: getPage,
            getAll: getAll,
            update: updateReview,
            delete: deleteReview,
            searchByKeyword: searchByKeyword
        };

        return service;
        /////////////////////

        /**
         * Creates a new review
         * @param review a review object that captures all details the API needs
         */
        function createReview(review) {
            return $http({
                url: APISERVICE.reviewUrl,
                method: 'POST',
                dataType: 'json',
                data: review,
                headers: APISERVICE.headers
            }).then(handleSuccess, handleFailure);
        }

        /**
         * Retrieves a review
         * @param id the id of the review to be retrieved
         */
        function getById(id) {
            return $http({
                url: APISERVICE.reviewUrl + '/' + id,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleFailure);
        }

        /**
         * Retrieves reviews about an API
         * @param apiId the id of the API
         */
        function getByAPI(apiId) {
            return $http({
                url: APISERVICE.apiUrl + '/' + apiId + '/reviews',
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleFailure);
        }

        /**
         * Retrieves reviews written by a reviewer
         * @param reviewerId the id of the reviewer
         */
        function getByReviewer(reviewerId) {
            return $http({
                url: APISERVICE.userUrl + '/' + reviewerId + '/reviews',
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleFailure);
        }

        /**
         * Retrieves a page of reviews
         * @param offset the starting index of reviews returned
         * @param limit the number of reviews returned
         */
        function getPage(offset, limit) {
            offset = typeof offset !== 'undefined' ? offset : 0;
            limit = typeof limit !== 'undefined' ? limit : 20;
            return $http({
                url: APISERVICE.reviewUrl + '?offset=' + offset + '&limit=' + limit,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleFailure);
        }

        /**
         * Retrieves all reviews
         */
        function getAll() {
            return $http({
                url: APISERVICE.reviewUrl,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleFailure);
        }

        /**
         * Updates a review
         * @param review the review object with updated information
         */
        function updateReview(review) {
            return $http({
                url: APISERVICE.reviewUrl + '/' + review.id,
                method: 'PUT',
                dataType: 'json',
                data: review,
                headers: APISERVICE.headers
            }).then(handleSuccess, handleFailure);
        }

        /**
         * Deletes a review
         * @param id the id of the review to be deleted
         */
        function deleteReview(id) {
            return $http({
                url: APISERVICE.reviewUrl + '/' + id,
                method: 'DELETE',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleFailure);
        }

        /**
         * Searches a review by keyword
         * @param keyword the keyword used to search
         */
        function searchByKeyword(keyword) {
            return $http({
                url: APISERVICE.reviewUrl + '/search?q=' + encodeURIComponent(keyword),
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleFailure);
        }

        // private functions
        function handleSuccess(response) {
            return $q.resolve(response.data);
        }

        function handleError(response) {
            return $q.reject(response);
        }
    }
}());
