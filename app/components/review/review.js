(function() {
    'use strict';

    angular
        .module('app.review')
        .controller('ReviewController', ReviewController);

    function ReviewController($location, $stateParams, dialogs, reviewservice, apiservice,
        userservice, tagservice, ratingservice, session, toastr, logger) {
        var vm = this;

        (function initController() {
            // load the review
            reviewservice.getById($stateParams.id)
                .then(function (review) {
                    vm.review = review;
                    return userservice.getById(vm.review.reviewer);
                }, getReviewFailed)
                .then(function (reviewer) {
                    vm.review.reviewer = reviewer;
                    return apiservice.getById(vm.review.api);
                }, getReviewFailed)
                .then(function (api) {
                    vm.review.api = api;
                    return ratingservice.getByReview(vm.review.id);
                }, getReviewFailed)
                .then(function (rating) {
                    vm.review.rating = rating;
                    return tagservice.getByReview(vm.review.id);
                }, getReviewFailed)
                .then(function (tagsObj) {
                    vm.review.tags = tagsObj.tags;
                    session.setCurrentReview(vm.review);
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
