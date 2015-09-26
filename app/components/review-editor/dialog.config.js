(function() {
    'use strict';

    angular
        .module('app.reviewEditor')
        .config(['dialogsProvider', config]);

    function config(dialogsProvider) {
        dialogsProvider.useBackdrop('static');
        dialogsProvider.setSize('sm');
    }
})();