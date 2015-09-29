(function() {
    'use strict';
    angular
        .module('app.reviewList')
        .controller('ReviewListController', ReviewListController);
    function ReviewListController(reviewservice, logger) {
        var vm = this;
		var offset = 2;
		var limit = 100;
		vm.PerPage = 20;
		vm.count = 20;
        reviewservice.getPage(1,100).then(function(data) {
			vm.count = data.count;
            vm.reviews = data.result;
			vm.currentPage = 1;
			
			
			//select a page
			vm.selectPage = function(selected) {
				if(vm.currentPage!=selected){
	  			 	 vm.currentPage=selected;
			  
	  	         	 reviewservice.getPage(selected,100).then(function(data) {
	  	           	  	vm.reviews = data.result;
	  				});
				}
				
			  
			};
			
			//handler previous page
			vm.prevPage = function() { 
				if (vm.currentPage > 1) {
					vm.currentPage--;
	  	          reviewservice.getPage(vm.currentPage,100).then(function(data) {
	  	            vm.reviews = data.result;
	  				});
				}
			};
			
			//handler next page
			vm.nextPage = function() {
				if (vm.currentPage < vm.pageCount()) {
					vm.currentPage++;
	  	          reviewservice.getPage(vm.currentPage,100).then(function(data) {
	  	            vm.reviews = data.result;
	  				});
				}
			};
			
			//count page number
			vm.pageCount = function() {
				return Math.ceil(vm.count/vm.PerPage);
			};

			//get each page number
			vm.pageRange = [];
				for (var i=1; i<= vm.pageCount();i++) {
					vm.pageRange.push(i);
				}
			
        vm.pageSize = 10;
        vm.doPaging = doPaging;

        reviewservice.getPage(0, vm.pageSize).then(function(result) {
            vm.totalNum = result.count;
            vm.reviews = result.results;
        });

        function doPaging(text, page) {
            reviewservice.getPage((page - 1) * vm.pageSize, vm.pageSize).then(function(result) {
                vm.reviews = result.results;
            });
        }
    }
})();
