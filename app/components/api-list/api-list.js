(function() {
    'use strict';

    angular
        .module('app.apiList')
        .controller('ApiListController', ApiListController);
    function ApiListController(apiservice, init, logger) {
        var vm = this;

        vm.pageSize = 10;
        vm.doPaging = doPaging;

        vm.totalNum = init.count;
        vm.apis = init.results;

        function doPaging(text, page) {
            apiservice.getPage((page - 1) * vm.pageSize, vm.pageSize).then(function(result) {
                vm.apis = result.results;
            });
        }
    }
})();
