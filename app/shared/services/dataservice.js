(function() {
    'use strict';

    angular
        .module('app.services')
        // .constant('JSONSTUB', {
        //   url: 'http://jsonstub.com/reviews',
        //   'content-type': 'application/json',
        //   'user-key': '51ec5e27-c872-4a8e-8070-dec92f5fca8f',
        //   'project-key': 'deeec676-1dad-4086-a1f0-ead970151994'
        // })
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
                url: APISERVICE.url + '/' + reviewId,
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

        function getReviews(page, numsPerPage) {
            return $http({
                url: APISERVICE.url + '?p=' + page + "&n=" + numsPerPage,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.url
            }).then(getReviewsComplete);

            function getReviewsComplete(data, status, headers, config) {
                var result = data.data;
                logger.success(
                    'Successfully retrieved ' + result.reviews.length + ' reviews',
                    result,
                    'dataservice.getReviews');
                return result;
            }
        }
    }
}());
