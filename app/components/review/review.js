(function() {
    'use strict';

    angular
        .module('app.review')
        .controller('ReviewController', ReviewController);

    function ReviewController($state, $stateParams, dialogs, reviewservice, commentservice, session, toastr, logger) {
        var vm = this;

        (function initController() {
            // load the review
            reviewservice.getById($stateParams.id)
                .then(function (result) {
                    vm.review = result;
                    return commentservice.getByReview($stateParams.id);
                }, getReviewFailed)
                .then(function (result) {
                    vm.review.comments = result.results;
                    session.setCurrentReview(vm.review);
                }, getReviewFailed);

            function getReviewFailed(error) {
                $state.go('review-list');
                toastr.error('Failed to retrieve the review. Please try again.');
            }
        })();

        vm.submitComment = submitComment;
        vm.showDialog = showDialog;
        vm.reload = reload;

        function submitComment() {
            vm.dataloading = true;
            var comment = {
                'content': vm.newComment
            };
            commentservice.create(comment)
                .then(submitCommentSuccessful, submitCommentFailed);

            function submitCommentSuccessful(result) {
                $state.reload();
                toastr.success('Successfully submitted!', 'New Comment');
            }

            function submitCommentFailed(error) {
                vm.dataloading = false;
                toastr.error('Failed to submit comment. Please try again.');
            }
        }

        function showDialog() {
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

        function reload() {
            $state.reload();
        }
    }
})();
