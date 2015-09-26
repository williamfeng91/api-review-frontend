(function() {
    'use strict';

    angular.module('app')
    .config([
      '$locationProvider',
      '$componentLoaderProvider',
      componentLoaderConfig])
    .controller('AppController', ['$router', AppController]);

    function dashCase(str) {
        return str.replace(/([A-Z])/g, function ($1) {
            return '-' + $1.toLowerCase();
        });
    }

    function componentLoaderConfig($locationProvider,$componentLoaderProvider) {
        function changeNameTmpl(name) {
            return changeName(name, '.html');
        }
        function changeName(name, ext) {
            var dashName = dashCase(name);
            // customized to use app prefix
            return './app/components/' + dashName + '/' + dashName + ext;
        }
        $componentLoaderProvider.setTemplateMapping(changeNameTmpl);
        $locationProvider.html5Mode({
          enabled: false,
          requireBase: false
        });
    }

    function getCompObj(main, header, footer) {
        main = typeof main !== 'undefined' ? main : 'main';
        header = typeof header !== 'undefined' ? header : 'header';
        footer = typeof footer !== 'undefined' ? footer : 'footer';
        return {
            main: main,
            header: header,
            footer: footer
        };
    }

    AppController.$routeConfig = [
        {
            path: '/',
            component: getCompObj('home')
        },
        {
            path: '/login',
            component: getCompObj('login')
        },
        {
            path: '/register',
            component: getCompObj('register')
        },
        {
            path: '/apis/:id',
            component: getCompObj('api')
        },
        {
            path: '/reviews/:id',
            component: getCompObj('review')
        },
        {
            path: '/reviews/:id/edit',
            component: getCompObj('reviewEditor'),
            as: 'editReview'
        },
        {
            path: '/reviews/new',
            component: getCompObj('reviewEditor'),
            as: 'newReview'
        },
        {
            path: '/reviews',
            component: getCompObj('reviewList')
        },
        {
            path: '/users/:id',
            component: getCompObj('user')
        }
    ];

    function AppController ($router) {}
})();
