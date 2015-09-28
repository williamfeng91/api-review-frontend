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
            'app.review',
            'app.reviewEditor',
            'app.reviewList',
            'app.user',
            'app.userProfileEditor'
        ])
        .run(run);

    function run($rootScope, $location, $cookieStore, authservice, session) {
        // keep user logged in after page refresh
        if ($cookieStore.get('currentUser')) {
            session.create($cookieStore.get('currentUser'));
        }
        if ($cookieStore.get('currentReview')) {    // debugging only
            session.setCurrentReview($cookieStore.get('currentReview'));
        }

        // disable for convenience when developing
        // $rootScope.$on('$locationChangeStart', function (event, next, current) {
        //     // redirect to login page if not logged in and trying to access a restricted page
        //     var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/']) === -1;
        //     if (restrictedPage && !authservice.isAuthenticated()) {
        //         $location.path('/login');
        //     }
        // });
    }
})();
