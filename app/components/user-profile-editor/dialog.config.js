(function() {
    'use strict';

    angular
        .module('app.userProfileEditor')
        .config(['dialogsProvider', config]);

    function config(dialogsProvider) {
        dialogsProvider.useBackdrop('static');
        dialogsProvider.setSize('md');
    }
})();