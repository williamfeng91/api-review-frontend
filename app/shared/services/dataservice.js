(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('dataservice', dataservice);

    /** @ngInject */
    function dataservice($http, logger, APISERVICE) {
        var service = {
            getReview: getReview,
            getReviews: getReviews
        };

        return service;
        /////////////////////

        function getReview(reviewId) {
            return $http({
                url: APISERVICE.reviewUrl + '/' + reviewId,
                // url: 'http://localhost:3000/review/' + reviewId,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(getReviewComplete);

            function getReviewComplete(data, status, headers, config) {
                var result = data.data;
                logger.success(
                    'Successfully retrieved review ' + result._id,
                    result,
                    'dataservice.getReview');
                return result;
            }
        }

        function getReviews(offset, limit) {
            return $http({
                url: APISERVICE.reviewUrl + '?offset=' + offset + "&limit=" + limit,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(getReviewsComplete);

            function getReviewsComplete(data, status, headers, config) {
                var result = data.data;
                logger.success(
                    'Successfully retrieved ' + result.items.length + ' reviews',
                    result,
                    'dataservice.getReviews');
                return result;
            }
        }
    }
}());
