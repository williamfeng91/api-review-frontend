(function() {
    'use strict';

    angular
        .module('app.footer')
        .directive('arFooter', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/shared/footer/footer.html',
                controllerAs: 'footerCtrl',
                controller: function() {

                }
            };
        });
})();