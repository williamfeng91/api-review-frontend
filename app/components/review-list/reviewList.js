(function() {
    'use strict';

    angular
        .module('app.reviewList')
        .controller('ReviewListController', ['$routeParams', 'dataservice','$scope',ReviewListController]);

    function ReviewListController($routeParams, dataservice,$scope) {
        var vm = this;
        dataservice.getReviews(0, 20).then(function(data) {
            vm.reviewList = data.items;
			console.log(data.items)
			$scope.reviews = data.items;
        });
    }
})();