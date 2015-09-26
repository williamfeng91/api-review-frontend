(function() {
    'use strict';

    angular
        .module('app.review', ['dialogs.main'])
        .controller('ReviewController', ReviewController);

    function ReviewController($scope, $location, $stateParams, dialogs, reviewservice,
        ratingservice, tagservice, apiservice, userservice, toastr, logger) {
        var vm = this;
        $scope.review = vm;

        (function initController() {
            // load the review
            reviewservice.getById($stateParams.id)
                .then(function (review) {
                    vm.review = review;
                    return userservice.getById(vm.review.reviewer);
                }, getReviewFailed)
                .then(function (reviewer) {
                    vm.reviewer = reviewer;
                    return apiservice.getById(vm.review.api);
                }, getReviewFailed)
                .then(function (api) {
                    vm.api = api;
                    return ratingservice.getByReview(vm.review.id);
                }, getReviewFailed)
                .then(function (rating) {
                    vm.rating = rating;
                    return tagservice.getByReview(vm.review.id);
                }, getReviewFailed).
                then(function (tagsObj) {
                    vm.tags = tagsObj.tags;
                }, getReviewFailed);

            function getReviewFailed(error) {
                $location.path('/reviews');
                toastr.error('Failed to retrieve the review. Please try again.');
            }
        })();

        vm.showDialog = function () {
            var dlg = dialogs.confirm(
                'Confirm deletion',
                'Do you really want to delete this review?');
            dlg.result.then(confirmDelete, cancel);

            function confirmDelete(btn) {
                reviewservice.delete(vm.review.id)
                    .then(deleteSuccessful, deleteFailed);

                function deleteSuccessful(result) {
                    $location.path('/reviews');
                    toastr.success('Review deleted');
                }

                function deleteFailed(error) {
                    toastr.error('Failed to delete the review. Please try again.');
                }
            }

            function cancel(btn) {
                logger.info('Delete review cancelled');
            }
        }

    }
})();
