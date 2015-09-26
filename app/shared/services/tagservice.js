(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('tagservice', tagservice);

    /** @ngInject */
    function tagservice($http, $q, APISERVICE, logger) {
        var service = {
            create: createTag,
            addToReview: addToReview,
            getByReview: getByReview,
            getAll: getAll,
            search: search,
            updateForReview: updateForReview
        };

        return service;
        /////////////////////

        /**
         * Creates a new tag
         * @param name the name of the tag
         */
        function createTag(name) {
            return $http({
                url: APISERVICE.tagUrl,
                method: 'POST',
                dataType: 'json',
                data: name,
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Adds tags to a review
         * @param reviewId the id of the review
         * @param tags an array of tags to be added to a review
         */
        function addToReview(reviewId, tags) {
            return $http({
                url: APISERVICE.reviewUrl + '/' + reviewId + '/tags',
                method: 'POST',
                dataType: 'json',
                data: tags,
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Retrieves tags of a review
         * @param reviewId the id of the review
         */
        function getByReview(reviewId) {
            return $http({
                url: APISERVICE.reviewUrl + '/' + reviewId + '/tags',
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Retrieves all tags
         */
        function getAll() {
            return $http({
                url: APISERVICE.tagUrl,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Search tags containing a keyword
         * @param keyword the keyword used to search
         */
        function search(keyword) {
            return $http({
                url: APISERVICE.tagUrl + '?query=' + keyword,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Updates tags of a review
         * @param reviewId the id of the review
         * @param tags the updated array of tags
         */
        function updateForReview(reviewId, tags) {
            return $http({
                url: APISERVICE.reviewUrl + '/' + reviewId + '/tags',
                method: 'PUT',
                dataType: 'json',
                data: tags,
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        // private functions
        function handleSuccess(response) {
            logger.success('API call successful', response, 'reviewservice');
            return $q.resolve(response.data);
        }

        function handleError(response) {
            logger.error('API call unsuccessful', response, 'reviewservice');
            return $q.reject(response);
        }
    }
}());
