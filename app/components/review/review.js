(function() {
    'use strict';

    angular
        .module('app.review')
        .directive('arReview', arReview);

    arReview.$inject = ['dataservice', '$routeParams'];

    function arReview(dataservice, $routeParams) {
        return {
            restrict: 'E',
            templateUrl: 'app/components/review/review.html',
            controllerAs: 'reviewCtrl',
            controller: function() {
                var vm = this;
                console.log($routeParams);
                dataservice.getReview(1).then(function(data) {
                    vm.review = data;
                });
            }
        };
    }
})();

angular
    .module('app.review', ['app.services'])
    .controller('ReviewController',['$routeParams','dataservice',ReviewController]);

function ReviewController($routeParams,dataservice) {
  dataservice.getReview($routeParams.id).then(function(data) {
      console.log(data);
  });
}
