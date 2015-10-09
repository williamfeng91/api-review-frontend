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
                  console.log('API SERVICE', apiservice);
                  function searchSubmit() {
                    apiservice.search(vm.query)
                    .then(success, fail);

                    function success(data) {
                      console.log('Great success', data);
                    }

                    function fail(err) {
                      console.log('Error', err);
                    }
                  }
                }
            };
        });
})();
