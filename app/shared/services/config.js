(function() {
    'use strict';

    var core = angular.module('app.services');

    core.config(toastrConfig);

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.closeButton = true;
        toastr.options.timeOut = 0;
        toastr.options.extendedTimeOut = 3000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appTitle: 'API Review',
        version: '1.0.0'
    };

    core.value('config', config);

    core.config(configure);

    /* @ngInject */
    function configure ($logProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }
})();
