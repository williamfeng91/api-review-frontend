(function() {
    'use strict';

    angular
        .module('app.header')
        .directive('arSearch', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/components/header/search.html',
                controllerAs: 'searchCtrl',
                controller: function($state, apiservice) {
                  var vm = this;
                  vm.searchSubmit = searchSubmit;
                  function searchSubmit() {
                    vm.dataLoading = true;
                    apiservice.search(vm.query)
                    .then(success, fail);

                    function success(data) {
                      var result = {
                        results: data,
                        count: data.length,
                        next: null,
                        previous: null
                      };
                      vm.dataLoading = false;
                      console.log('Great success', result);
                      $state.go('api-list', {initData: result});
                    }

                    function fail(err) {
                      vm.dataLoading = false;
                      console.log('Error', err);
                    }
                  }
                }
            };
        });
})();
