(function() {
    'use strict';

    angular
        .module('app.review')
        .controller('ReviewController', ['$routeParams', 'dataservice', ReviewController]);

    function ReviewController($routeParams, dataservice) {
        var vm = this;
        dataservice.getReview($routeParams.id).then(function(data) {
            vm.review = data;
        });
    }
})();
