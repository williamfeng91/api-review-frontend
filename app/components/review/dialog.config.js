(function() {
    'use strict';

    angular
        .module('app.review')
        .config(['dialogsProvider', config]);

    function config(dialogsProvider) {
        dialogsProvider.useBackdrop('static');
        dialogsProvider.setSize('sm');
    }
})();