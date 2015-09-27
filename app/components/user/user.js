(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('UserController', UserController);

    function UserController($state, $routeParams, dialogs, userservice, reviewservice,
        toastr, logger) {
        var vm = this;

        (function initController() {
            // load the user

        })();

    }
})();
