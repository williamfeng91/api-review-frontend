(function() {
    'use strict';

    angular
        .module('app.userList')
        .controller('UserListController', UserListController);

    /** @ngInject */
    function UserListController($state, $stateParams, initData, userservice, session, logger) {
        var vm = this;

        vm.currentPage = typeof $stateParams.page !== 'undefined' ? $stateParams.page : 1;
        vm.pageSize = session.getPageSize();
        vm.doPaging = doPaging;

        vm.totalNum = initData.count;
        vm.users = initData.results;

        function doPaging(text, page) {
            $state.go('user-list', {page: page});
        }
    }
})();
