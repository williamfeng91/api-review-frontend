(function() {
    'use strict';

    angular
        .module('app.userProfile')
        .controller('UserProfileController', UserProfileController);

    function UserProfileController($state,initData,dialogs, userservice, reviewservice,
        toastr, logger) {
        var vm = this;

        vm.user = initData;
        vm.reload = function () {
          $state.reload();
        }

        vm.searchSubmit = function () {
          console.log('Search submited');
          $state.go('user-list', {'search': vm.searchQuery, page:1});
        }
    }
})();
