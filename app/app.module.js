(function() {
    'use strict';

    angular.module('app', [
        'ngNewRouter',
        'app.services',
        'app.header',
        'app.footer',
        'app.home',
        'app.review',
        'app.reviewEditor',
        'app.reviewList'
    ]);
})();
