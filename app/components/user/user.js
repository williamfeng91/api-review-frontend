(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('UserController', UserController);

    function UserController($state, $stateParams, dialogs, userservice, reviewservice,
        toastr, logger) {
        var vm = this;

        (function initController() {
            // load the user

        })();

    }
})();
