(function() {
    'use strict';

    angular
        .module('app.api')
        .config(['dialogsProvider', config]);

    function config(dialogsProvider) {
        dialogsProvider.useBackdrop('static');
        dialogsProvider.setSize('sm');
    }
})();