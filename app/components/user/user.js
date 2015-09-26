(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('UserController', UserController);

    function UserController($location, $routeParams, dialogs, userservice, reviewservice,
        toastr, logger) {
        var vm = this;

        (function initController() {
            // load the user

        })();

    }
})();
