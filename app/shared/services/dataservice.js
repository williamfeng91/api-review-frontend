(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('dataservice', dataservice);

    /** @ngInject */
    function dataservice($http, $q, logger, APISERVICE) {
        var service = {
            getReview: getReview,
            getReviews: getReviews,
            addReview: addReview,
            deleteReview: deleteReview
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
            }).then(getReviewComplete, getReviewFailed);

            function getReviewComplete(response) {
                var result = response.data;
                logger.success(
                    'Successfully retrieved review ' + result._id,
                    result,
                    'dataservice.getReview');
                return result;
            }

            function getReviewFailed(response) {
                logger.error(
                    'Failed to retrieve review ' + reviewId,
                    response,
                    'dataservice.getReview');
                return $q.reject(response);
            }
        }

        function getReviews(offset, limit) {
            return $http({
                url: APISERVICE.reviewUrl + '?offset=' + offset + "&limit=" + limit,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: APISERVICE.headers
            }).then(getReviewsComplete, getReviewsFailed);

            function getReviewsComplete(response) {
                var result = response.data;
                logger.success(
                    'Successfully retrieved ' + result.items.length + ' reviews',
                    result,
                    'dataservice.getReviews');
                return $q.resolve(result);
            }

            function getReviewsFailed(response) {
                logger.error(
                    'Failed to retrieve reviews',
                    response,
                    'dataservice.getReviews');
                return $q.reject(response);
            }
        }

        function addReview(review) {
            return $http({
                url: APISERVICE.reviewUrl,
                method: 'POST',
                dataType: 'json',
                data: review,
                headers: APISERVICE.headers
            }).then(addReviewComplete, addReviewFailed);

            function addReviewComplete(response) {
                var result = response.data;
                logger.success(
                    'Successfully added a review',
                    result,
                    'dataservice.addReview');
                return $q.resolve(result);
            }

            function addReviewFailed(response) {
                logger.error(
                    'Failed to add review ' + view.title,
                    response,
                    'dataservice.addReview');
                return $q.reject(response);
            }
        }

        function deleteReview(reviewId) {
            return $http({
                url: APISERVICE.reviewUrl + '/' + reviewId,
                method: 'DELETE',
                dataType: 'json',
                data: review,
                headers: APISERVICE.headers
            }).then(deleteReviewComplete, deleteReviewFailed);

            function deleteReviewComplete(response) {
                var result = response.data;
                logger.success(
                    'Successfully deleted a review',
                    result,
                    'dataservice.deleteReview');
                return $q.resolve(result);
            }

            function deleteReviewFailed(response) {
                logger.error(
                    'Failed to delete review ' + view.title,
                    response,
                    'dataservice.deleteReview');
                return $q.reject(response);
            }
        }
    }
}());
