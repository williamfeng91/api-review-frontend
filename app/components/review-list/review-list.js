(function() {
    'use strict';

    angular
        .module('app.reviewList')
        .controller('ReviewListController', ReviewListController);
    function ReviewListController(reviewservice) {
        var vm = this;
		var count = 0;
		var tatal = "";
        reviewservice.getPage(0,20).then(function(reviews) {
            vm.reviews = reviews.result;
			count=count+1;
        });
    }
})();
