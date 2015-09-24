(function() {
    'use strict';

    angular
        .module('app.review')
        .controller('ReviewController', ReviewController);

    function ReviewController($location, $routeParams, dataservice, toastr) {
        var vm = this;

        (function initController() {
            // load the review
            dataservice.getReview($routeParams.id)
                .then(getReviewSuccessful, getReviewFailed);

            function getReviewSuccessful(result) {
                vm.review = result;
            }

            function getReviewFailed(error) {
                $location.path('/reviews');
                toastr.error('The review was not found. Please try again.');
            }
        })();

    }
})();
