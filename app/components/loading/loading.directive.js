(function() {
    'use strict';

    angular
        .module('app')
        .directive('loading', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/components/loading/loading.html',
                controller: function() {

                }
            };
        });
})();
