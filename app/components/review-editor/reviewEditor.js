(function() {
    'use strict';

    angular
        .module('app.reviewEditor')
        .controller('ReviewEditorController', ReviewEditorController);

    /** @ngInject */
    function ReviewEditorController($location, $routeParams, reviewservice, tagservice,
        session, logger) {
        var vm = this;

        vm.review = session.getCurrentReview();
        vm.loadTags = loadTags;
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

        function submitReview() {
            logger.info('Submitting');
        }

        function cancelEdit() {
            $location.path('/reviews/' + vm.review.id);
            logger.info('Editting cancelled');
        }
    }
})();
