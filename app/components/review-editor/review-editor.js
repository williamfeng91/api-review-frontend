(function() {
    'use strict';

    angular
        .module('app.reviewEditor')
        .controller('ReviewEditorController', ReviewEditorController);

    /** @ngInject */
    function ReviewEditorController($location, $stateParams, reviewservice, apiservice,
        userservice, tagservice, ratingservice, session, toastr, logger) {
        var vm = this;

        vm.review = session.getCurrentReview();
        if (vm.review.id != $stateParams.id) {
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
        }
        vm.loadTags = loadTags;
        vm.showDialog = showDialog;
        vm.submit = submitReview;
        vm.cancel = cancelEdit;

        function loadTags(query) {
            return tagservice.getAll()
                .then(function (result) {
                    var tags = result.tags;
                    return tags.filter(function (tag) {
                        return tag.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
                    });
                });
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

        function submitReview() {
            logger.log(vm.review);
        }

        function cancelEdit() {
            $location.path('/reviews/' + vm.review.id);
            logger.info('Editting cancelled');
        }
    }
})();
