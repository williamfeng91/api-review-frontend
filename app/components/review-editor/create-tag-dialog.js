(function() {
    'use strict';

    angular
        .module('app.reviewEditor')
        .controller('createTagDialogController', createTagDialogController);

    function createTagDialogController($scope, $modalInstance, logger) {
        //-- Variables --//
        $scope.tag = {
            name: ''
        };

        //-- Methods --//
        $scope.cancel = function() {
            $modalInstance.dismiss('Canceled');
        };

        $scope.save = function() {
            $modalInstance.close($scope.tag.name);
        };

        $scope.hitEnter = function(evt) {
            if (angular.equals(evt.keyCode, 13)
                && !(angular.equals($scope.tag.name, null)
                    || angular.equals($scope.tag.name, ''))) {
                $scope.save();
            }
        };
    }
})();
