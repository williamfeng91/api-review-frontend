(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('ratingservice', ratingservice);

    /** @ngInject */
    function ratingservice($http, $q, APISERVICE, logger) {
        var service = {
            addToReview: addToReview,
            getByReview: getByReview
        };

        return service;
        /////////////////////

        /**
         * Add rating to a review
         * @param reviewId the id of the review
         * @param rating the rating to be added to a review
         */
        function addToReview(reviewId, rating) {
            return $http({
                url: APISERVICE.reviewUrl + '/' + reviewId + '/ratings',
                method: 'POST',
                dataType: 'json',
                data: review,
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        /**
         * Retrieves ratings of a review
         * @param reviewId the id of the review
         */
        function getByReview(reviewId) {
            return $http({
                url: APISERVICE.reviewUrl + '/' + reviewId + '/ratings',
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(handleSuccess, handleError);
        }

        // private functions
        function handleSuccess(response) {
            logger.success('API call successful', response, 'ratingservice');
            return $q.resolve(response.data);
        }

        function handleError(response) {
            logger.error('API call unsuccessful', response, 'ratingservice');
            return $q.reject(response);
        }
    }
}());
