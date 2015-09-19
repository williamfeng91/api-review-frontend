(function() {
    'use strict';

    angular
        .module('app.header')
        .directive('arSearch', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/shared/header/search.html',
                controllerAs: 'searchCtrl',
                controller: function() {

                }
            };
        });
})();