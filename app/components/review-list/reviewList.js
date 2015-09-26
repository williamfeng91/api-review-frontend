(function() {
    'use strict';

    angular
        .module('app.reviewList')
        .controller('ReviewListController', ReviewListController);

    function ReviewListController($scope, $stateParams, dataservice) {
        var vm = this;
        $scope.reviewList = vm;
        dataservice.getReviews(0, 20).then(function(data) {
            vm.reviews = data.items;
        });
    }
})();
