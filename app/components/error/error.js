(function() {
    'use strict';

    angular
        .module('app.error')
        .controller('ErrorController', ErrorController);

    /** @ngInject */
    function ErrorController($state, $stateParams, logger) {
        var vm = this;

        switch ($stateParams.type) {
            case 'forbidden':
                vm.statusCode = '403 Forbidden';
                vm.description = 'You don\'t have the permission to access this page.';
                break;
            default 'not-found':
                vm.statusCode = '404 Not Found';
                vm.description = 'The requested page was not found.';
                break;
        }
    }
})();
