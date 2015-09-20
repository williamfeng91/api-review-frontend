(function() {
    'use strict';

    angular
        .module('app.review')
        .controller('ReviewController', ['$routeParams', 'dataservice', ReviewController]);

    function ReviewController($routeParams, dataservice) {
        var vm = this;
        console.log($routeParams);
        dataservice.getReview($routeParams.id).then(function(data) {
            vm.review = data;
        });
    }
})();
