(function() {
    'use strict';

    angular
        .module('app.reviewEditor')
        .controller('ReviewEditorController', ReviewEditorController);

    /** @ngInject */
    function ReviewEditorController($location, $stateParams, dialogs, reviewservice,
        apiservice, userservice, tagservice, ratingservice, session, toastr, logger) {
        var vm = this;

        vm.review = session.getCurrentReview();
        vm.loadTags = loadTags;
        vm.showDialog = showDialog;
        vm.submit = submitReview;
        vm.cancel = cancelEdit;

        // Use review stored in session if valid
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
            var dlg = dialogs.create(
                '/app/components/review-editor/create-tag-dialog.html',
                'createTagDialogController',
                {});
            dlg.result.then(saveTag, cancel);

            function saveTag(name) {
                var tag = {
                    'name': name
                }
                tagservice.create(tag)
                    .then(createTagSuccessful, createTagFailed);

                function createTagSuccessful(result) {
                    vm.review.tags.push(result);
                    toastr.success('New tag \'' + result.name + '\' added!');
                }

                function createTagFailed(error) {
                    toastr.error('Failed to add the tag. Please try again.');
                }
            }

            function cancel(btn) {
            }
        }

        function submitReview() {
            logger.log(vm.review);
            var review = {
                'id': vm.review.id,
                'title': vm.review.title,
                'content': vm.review.content,
                'api': vm.review.api.id,
                'reviewer': vm.review.reviewer.id,
                'datetime_created': vm.review.datetime_created,
                'last_updated': vm.review.last_updated
            };
            reviewservice.update(review)
                .then(updateReviewSuccessful, updateReviewFailed);

            function updateReviewSuccessful(result) {
                $location.path('/reviews/' + vm.review.id);
                toastr.success('Review successfully updated!');
            }

            function updateReviewFailed(result) {
                toastr.error('Failed to submit review. Please try again.');
            }
        }

        function cancelEdit() {
            $location.path('/reviews/' + vm.review.id);
            logger.info('Editting cancelled');
        }
    }
})();
