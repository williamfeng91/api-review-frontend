(function() {
    'use strict';

    angular
        .module('app.apiList')
        .controller('ApiListController', ApiListController);
    function ApiListController(apiservice, logger) {
        var vm = this;

        vm.pageSize = 10;
        vm.doPaging = doPaging;

        apiservice.getPage(0, vm.pageSize).then(function(result) {
            vm.totalNum = result.count;
            vm.apis = result.results;
        });

        function doPaging(text, page) {
            apiservice.getPage((page - 1) * vm.pageSize, vm.pageSize).then(function(result) {
                vm.apis = result.results;
            });
        }
    }
})();
