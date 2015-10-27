(function() {
    'use strict';

    angular
        .module('app.header')
        .directive('arSearch', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/components/header/search.html',
                controllerAs: 'searchCtrl',
                controller: function($state, reviewservice) {
                    var vm = this;
                    vm.searchSubmit = searchSubmit;
                    function searchSubmit() {
                        $state.go('review-list', {
                            'search': vm.query,
                            'type': 'title',
                            page: 1
                        });
                    }
                }
            };
        });
})();
