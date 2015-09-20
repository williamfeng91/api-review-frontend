(function() {
    'use strict';

    angular
        .module('app.reviewList')
        .controller('ReviewListController', ['$routeParams', 'dataservice', ReviewListController]);

    function ReviewListController($routeParams, dataservice) {
        var vm = this;
        dataservice.getReviews(1, 20).then(function(data) {
            vm.review = data;
        });
    }
})();
