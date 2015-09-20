(function() {
    'use strict';

    angular.module('app')
    .config(componentLoaderConfig)
    .controller('AppController', ['$router', AppController]);

    function dashCase(str) {
        return str.replace(/([A-Z])/g, function ($1) {
            return '-' + $1.toLowerCase();
        });
    }

    function componentLoaderConfig($componentLoaderProvider) {
        function changeNameTmpl(name) {
            return changeName(name, '.html');
        }
        function changeName(name, ext) {
            var dashName = dashCase(name);
            // customized to use app prefix
            return './app/components/' + dashName + '/' + dashName + ext;
        }
        $componentLoaderProvider.setTemplateMapping(changeNameTmpl);
    }

    AppController.$routeConfig = [
        {
            path: '/',
            component: {
                header: 'header',
                main: 'home',
                footer: 'footer'
            }
        },
        {
            path: '/reviews/:id',
            component: {
                header: 'header',
                main: 'review',
                footer: 'footer'
            }
        },
        {
            path: '/reviews/:id/edit',
            component: {
                header: 'header',
                main: 'reviewEditor',
                footer: 'footer'
            }
        },
        {
            path: '/reviews/new',
            component: {
                header: 'header',
                main: 'reviewEditor',
                footer: 'footer'
            }
        },
        {
            path: '/reviews',
            component: {
                header: 'header',
                main: 'reviewList',
                footer: 'footer'
            }
        }
    ];

    function AppController ($router) {}
})();
