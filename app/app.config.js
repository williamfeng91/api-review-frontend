(function() {
    'use strict';

    var app = angular.module('app');

    app.config(toastrConfig);

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.closeButton = true;
        toastr.options.timeOut = 0;
        toastr.options.extendedTimeOut = 500;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appTitle: 'API Review',
        version: '1.0.0'
    };

    app.value('config', config);

    app.config(configure);

    /* @ngInject */
    function configure ($logProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }
})();
