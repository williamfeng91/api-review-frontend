(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('dataservice', dataservice);

    /** @ngInject */
    function dataservice($http) {
        var service = {
            getReview: getReview
        };

        return service;
        /////////////////////

        function getReview(reviewId) {
            return $http({
                url: 'http://jsonstub.com/reviews/' + reviewId,
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json',
                    'JsonStub-User-Key': '51ec5e27-c872-4a8e-8070-dec92f5fca8f',
                    'JsonStub-Project-Key': 'deeec676-1dad-4086-a1f0-ead970151994'
                }
            }).then(getReviewComplete);

            function getReviewComplete(data, status, headers, config) {
                return data.data;
            }
        }
    }
}());
