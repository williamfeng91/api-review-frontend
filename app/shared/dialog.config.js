(function() {
    'use strict';

    angular
        .module('app')
        .config(['dialogsProvider', config]);

    function config(dialogsProvider) {
        dialogsProvider.useBackdrop('static');
        dialogsProvider.setSize('md');
    }
})();