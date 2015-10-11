(function() {
    'use strict';

    angular
        .module('app.reviewList')
        .controller('ReviewListController', ReviewListController);

    /** @ngInject */
    function ReviewListController($state, $stateParams, initData, reviewservice, session, CONSTANTS, logger) {
        var vm = this;

        vm.currentPage = typeof $stateParams.page !== 'undefined' ? $stateParams.page : 1;
        vm.pageSize = session.getPageSize();
        vm.availablePageSizes = CONSTANTS.AVAILABLE_PAGE_SIZES;
        vm.doPaging = doPaging;
        vm.onPageSizeChange = onPageSizeChange;

        vm.totalNum = initData.count;
        vm.reviews = initData.results;

        function doPaging(text, page) {
            $state.go('review-list', {page: page});
        }

        function onPageSizeChange() {
            session.setPageSize(vm.pageSize);
            // go to first page
            if (vm.currentPage != 1) {
                $state.go('review-list', {page: 1});
            } else {
                $state.reload();
            }
        }
    }
})();
