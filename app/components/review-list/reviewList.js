(function() {
    'use strict';

    angular
        .module('app.reviewList')
<<<<<<< HEAD
        .controller('ReviewListController', ['$routeParams', 'dataservice','$scope',ReviewListController]);
=======
        .controller('ReviewListController', ReviewListController);
>>>>>>> d491843ca6093b6b5ee974d592d1b407ef804df2

    function ReviewListController($routeParams, dataservice,$scope) {
        var vm = this;
<<<<<<< HEAD
        dataservice.getReviews(2, 20).then(function(data) {
=======
        dataservice.getReviews(0, 20).then(function(data) {
>>>>>>> d491843ca6093b6b5ee974d592d1b407ef804df2
            vm.review = data;
			// console.log(data)
			$scope.reviews = data.reviews;
        });
    }
})();
