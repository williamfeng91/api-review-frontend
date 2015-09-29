(function() {
    'use strict';

    angular
        .module('app.review')
        .controller('ReviewController', ReviewController);

    function ReviewController($state, $stateParams, dialogs, reviewservice, session, toastr, logger) {
        var vm = this;

        (function initController() {
            // load the review
            reviewservice.getById($stateParams.id)
                .then(getReviewSuccessful, getReviewFailed);

            function getReviewSuccessful(result) {
                vm.review = result;
                session.setCurrentReview(vm.review);
            }

            function getReviewFailed(error) {
                $state.go('review-list');
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
                    $state.go('review-list');
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

        vm.reload = function () {
            $state.reload();
        }
    }
})();
