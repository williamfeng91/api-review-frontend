(function() {
    'use strict';

    angular
        .module('app.reviewList')
        .controller('ReviewListController', ['$routeParams', 'dataservice','$scope',ReviewListController]);

    function ReviewListController($routeParams, dataservice,$scope) {
        var vm = this;
        dataservice.getReviews(2, 20).then(function(data) {
            vm.review = data;
			// console.log(data)
			$scope.reviews = data.reviews;
        });
    }
})();