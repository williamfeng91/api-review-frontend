(function() {
    'use strict';

    angular.module('app')
        .config(stateConfig)
        .controller('AppController', AppController);

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function unCapitalizeFirstLetter(string) {
            return string.charAt(0).toLowerCase() + string.slice(1);
        }

        function getControllerName(name) {
            return name.split('-').map(function(item){
                return capitalizeFirstLetter(item);
            }).join('');
        }

        function getControllerAlias(name) {
            return unCapitalizeFirstLetter(getControllerName(name));
        }

        function getSubCompObj(component) {
        return {
            templateUrl: 'app/components/' + component + '/' + component + '.html',
            controller: getControllerName(component) + 'Controller',
            controllerAs: getControllerAlias(component) + 'Ctrl'
        };
    }

    function getUICompObj(main, header, footer) {
        main = typeof main !== 'undefined' ? main : 'main';
        header = typeof header !== 'undefined' ? header : 'header';
        footer = typeof footer !== 'undefined' ? footer : 'footer';
        return {
            'header': getSubCompObj(header),
            'footer': getSubCompObj(footer),
            'main': getSubCompObj(main)
        };
    }

    function stateConfig($locationProvider, $stateProvider, $urlRouterProvider, $uiViewScrollProvider) {
        $locationProvider.html5Mode({
            enabled: false, // set to true to remove hash. Don't want to set it now because it
                            // doesn't allow access to pages by typing url directly
            requireBase: false
        });
        $uiViewScrollProvider.useAnchorScroll();
        $stateProvider
            .state('home', {
                url: '/',
                views: getUICompObj('home')
            })
            .state('login', {
                url: '/login',
                views: getUICompObj('login')
            })
            .state('register', {
                url: '/register',
                views: getUICompObj('register')
            })
            .state('reset-password', {
                url: '/reset-password',
                views: getUICompObj('reset-password')
            })
            .state('review-item-new', {
                url: '/reviews/new?api',
                views: getUICompObj('review-editor')
            })
            .state('review-item-view', {
                url: '/reviews/:id',
                views: getUICompObj('review')
            })
            .state('review-item-edit', {
                url: '/reviews/:id/edit',
                views: getUICompObj('review-editor'),
            })
            .state('review-list', {
                url: '/reviews',
                views: getUICompObj('review-list')
            })
            .state('api-item-new', {
                url: '/apis/new',
                views: getUICompObj('api-editor')
            })
            .state('api-item-view', {
                url: '/apis/:id',
                views: getUICompObj('api')
            })
            .state('api-item-edit', {
                url: '/apis/:id/edit',
                views: getUICompObj('api-editor'),
            })
            .state('api-list', {
                url: '/apis',
                views: getUICompObj('api-list')
            })
            .state('user-profile-edit', {
                url: '/users/my-profile',
                views: getUICompObj('user-profile-editor'),
            })
            .state('user-profile-view', {
                url: '/users/:id',
                views: getUICompObj('user-profile')
            })
            .state('user-list', {
                url: '/users',
                views: getUICompObj('user-list')
            });
    }

    function AppController () {}
})();
