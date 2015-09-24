(function() {
    'use strict';

    angular
        .module('app.reviewEditor')
        .controller('ReviewEditorController', ReviewEditorController);

    function ReviewEditorController($routeParams, dataservice, logger) {
        var vm = this;
        logger.log("test");
    }
})();
