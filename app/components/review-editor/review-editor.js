(function() {
    'use strict';

    angular
        .module('app.reviewEditor')
        .controller('ReviewEditorController', ReviewEditorController);

    /** @ngInject */
    function ReviewEditorController($state, $stateParams, dialogs, reviewservice,
        apiservice, userservice, tagservice, ratingservice, session, toastr, logger) {
        var vm = this;

        vm.isEditMode = ($state.current.name == 'review-item-edit');
        vm.loadTags = loadTags;
        vm.showCreateTagDialog = showCreateTagDialog;
        vm.submit = submitReview;
        vm.cancel = cancelEdit;
        vm.review = {
            'title': '',
            'content': '',
            'description': '',
            'api': {},
            'tags': []
        };

        // Get all APIs for autocomplete
        vm.allApis = [];

        apiservice.getAll()
            .then(getAllAPIsSuccess, getAllAPIsFailed);

        function getAllAPIsSuccess(result) {
            vm.allApis = result.results;
            logger.log(vm.allApis);
        }

        function getAllAPIsFailed(result) {
        }

        // Use review stored in session if valid when editing review
        if (vm.isEditMode) {
            vm.review = session.getCurrentReview();

            if (vm.review == null || vm.review.id != $stateParams.id) {
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
            }
        }

        function loadTags(query) {
            return tagservice.getAll()
                .then(function (result) {
                    var tags = result.results;
                    return tags.filter(function (tag) {
                        return tag.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
                    });
                });
        }

        function showCreateTagDialog() {
            var dlg = dialogs.create(
                '/app/components/review-editor/create-tag-dialog.html',
                'CreateTagDialogController',
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
            vm.dataLoading = true;
            logger.log(vm.review);
            var reviewObj = {
                'title': vm.review.title,
                'content': vm.review.content,
                'description': vm.review.description,
                'api': vm.review.api.id,
                'tags': []
            };
            angular.forEach(vm.review.tags, function(tag) {
                reviewObj.tags.push(tag.id);
            });
            if (vm.isEditMode) {
                reviewObj.id = vm.review.id;
                reviewservice.update(reviewObj)
                    .then(updateReviewSuccessful, submitReviewFailed);
            } else {
                reviewObj.api = vm.selectedApi.originalObject.id;
                reviewservice.create(reviewObj)
                    .then(createReviewSuccessful, submitReviewFailed);
            }
            logger.log(reviewObj);

            function createReviewSuccessful(result) {
                $state.go('review-item-view', {id: result.id});
                toastr.success('Review successfully created!');
            }

            function updateReviewSuccessful(result) {
                $state.go('review-item-view', {id: vm.review.id});
                toastr.success('Review successfully updated!');
            }

            function submitReviewFailed(result) {
                vm.dataLoading = false;
                toastr.error('Failed to submit review. Please try again.');
            }
        }

        function cancelEdit() {
            $state.go('review-item-view', {id: vm.review.id});
            logger.info('Editing cancelled');
        }
    }
})();
