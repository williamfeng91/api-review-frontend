(function() {
    'use strict';

    angular
        .module('app.api')
        .controller('ApiController', ApiController);

    function ApiController($location, $routeParams, dialogs, apiservice, reviewservice,
        toastr, logger) {
        var vm = this;

        (function initController() {
            // load the API

        })();

    }
})();
