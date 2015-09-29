(function() {
    'use strict';

    angular
        .module('app.reviewList')
        .controller('ReviewListController', ReviewListController);

    function ReviewListController($routeParams, reviewservice,apiservice,userservice) {
        var vm = this;
		var count = 0;
		var tatal = "";
        reviewservice.getPage().then(function(reviews) {
            vm.reviews = reviews.items;
			count=count+1;
			return createAPI(reviews.items[1].api,count,tatal);
        });
    }

	function createAPI(aipId,count){
	
		var apiJsonId = aipId;
		var apiJsonName = "new Api"+count;
		count=count+1;
		tatal += apiJsonId +" "+apiJsonName;
	
	}
})();