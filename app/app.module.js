(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'ngCookies',
            'ngPassword',
            'ui.bootstrap',
            'ui.tinymce',
            'dialogs.main',
            'bw.paging',
            'angucomplete-alt',
            'ngTagsInput',
            'app.services',
            'app.header',
            'app.footer',
            'app.login',
            'app.register',
            'app.resetPassword',
            'app.home',
            'app.api',
            'app.apiEditor',
            'app.apiList',
            'app.review',
            'app.reviewEditor',
            'app.reviewList',
            'app.user',
            'app.userProfileEditor',
            'app.userList'
        ])
        .run(run);

    function run($rootScope, $state, $cookieStore, authservice, session, toastr) {
        // keep user logged in after page refresh
        if ($cookieStore.get('currentUser')) {
            session.create($cookieStore.get('currentUser'));
        }
        if ($cookieStore.get('pageSize')) {
            session.setPageSize($cookieStore.get('pageSize'));
        }

        $rootScope.stateIsLoading = false;
        $rootScope.$on('$stateChangeStart', function() {
            $rootScope.stateIsLoading = true;
        });
        $rootScope.$on('$stateChangeSuccess', function() {
            $rootScope.stateIsLoading = false;
        });
        $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error) {
            if (angular.isObject(error) && angular.isString(error.code)) {
                switch (error.code) {
                    case 'NOT_AUTHENTICATED':
                        // go to the login page
                        $state.go('login');
                        break;
                    default:
                        // set the error object on the error state and go there
                        $state.get('error').error = error;
                        $state.go('error');
                }
                toastr.error(error.message);
            }
            else {
                // unexpected error
                $state.go('error');
            }
        });
    }
})();
