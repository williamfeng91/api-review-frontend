(function() {
    'use strict';

    angular
        .module('app.reviewList')
        .controller('ReviewListController', ReviewListController);

    function ReviewListController($routeParams, dataservice) {
        var vm = this;
        dataservice.getReviews(0, 20).then(function(data) {
            vm.review = data;
        });
    }
})();
