(function() {
    'use strict';

    angular
        .module('app.reviewList')
        .controller('ReviewListController', ReviewListController);
    function ReviewListController(reviewservice, logger) {
        var vm = this;

        vm.pageSize = 10;
        vm.doPaging = doPaging;

        reviewservice.getPage(0, vm.pageSize).then(function(result) {
            vm.totalNum = result.count;
            vm.reviews = result.results;
        });

        function doPaging(text, page) {
            reviewservice.getPage((page - 1) * vm.pageSize, vm.pageSize).then(function(result) {
                vm.reviews = result.results;
            });
        }
    }
})();
