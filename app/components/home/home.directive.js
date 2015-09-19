(function() {
    'use strict';

    angular
        .module('app.home')
        .directive('arHome', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/components/home/home.html',
                controllerAs: 'homeCtrl',
                controller: function() {
                  
                }
            };
        });
})();
