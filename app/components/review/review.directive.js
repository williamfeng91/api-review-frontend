(function() {
    'use strict';

    angular
        .module('app.review')
        .directive('arReview', arReview);

    arReview.$inject = ['dataservice'];

    function arReview(dataservice) {
        return {
            restrict: 'E',
            templateUrl: 'app/components/review/review.html',
            controllerAs: 'reviewCtrl',
            controller: function() {
                var vm = this;
                dataservice.getReview(1).then(function(data) {
                    vm.review = data;
                });
            }
        };
    }
})();