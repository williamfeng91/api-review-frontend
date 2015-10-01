(function() {
    'use strict';

    angular.module('app')
        .config(stateConfig)
        .config(urlConfig)
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

    function getSubCompObj(component, resolveObj) {
        return {
            templateUrl: 'app/components/' + component + '/' + component + '.html',
            controller: getControllerName(component) + 'Controller',
            controllerAs: getControllerAlias(component) + 'Ctrl',
            resolve: resolveObj
        };
    }

    function getUICompObj(main, header, footer, resolveObj) {
        main = typeof main !== 'undefined' ? main : 'main';
        header = typeof header !== 'undefined' ? header : 'header';
        footer = typeof footer !== 'undefined' ? footer : 'footer';
        return {
            'header': getSubCompObj(header),
            'footer': getSubCompObj(footer),
            'main': getSubCompObj(main, resolveObj)
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
                views: getUICompObj('home'),
            })
            .state('login', {
                url: '/login',
                views: getUICompObj('login'),
            })
            .state('register', {
                url: '/register',
                views: getUICompObj('register'),
            })
            .state('reset-password', {
                url: '/reset-password',
                views: getUICompObj('reset-password'),
            })
            .state('review-item-new', {
                url: '/reviews/new?api',
                views: getUICompObj('review-editor'),
            })
            .state('review-item-view', {
                url: '/reviews/:id',
                views: getUICompObj('review', undefined, undefined, {
                    initData: function ($q, $stateParams, reviewservice, commentservice) {
                        var review = {};
                        return reviewservice.getById($stateParams.id)
                            .then(function (result) {
                                review = result;
                                return commentservice.getByReview($stateParams.id);
                            }, getReviewFailed)
                            .then(function (result) {
                                review.comments = result.results;
                                return review;
                            }, getReviewFailed);

                        function getReviewFailed(error) {
                            return $q.reject({
                                code: 'NOT_FOUND',
                                message: 'Failed to retrieve review.'
                            });
                        }
                    }
                }),
            })
            .state('review-item-edit', {
                url: '/reviews/:id/edit',
                views: getUICompObj('review-editor'),
            })
            .state('review-list', {
                url: '/reviews',
                views: getUICompObj('review-list'),
            })
            .state('api-item-new', {
                url: '/apis/new',
                views: getUICompObj('api-editor'),
            })
            .state('api-item-view', {
                url: '/apis/:id',
                views: getUICompObj('api', undefined, undefined, {
                    initData: function ($q, $state, $stateParams, apiservice) {
                        return apiservice.getById($stateParams.id)
                            .then(getApiSuccessful, getApiFailed);

                        function getApiSuccessful(result) {
                            return $q.resolve(result);
                        }

                        function getApiFailed(error){
                            return $q.reject({
                                code: 'NOT_FOUND',
                                message: 'Failed to retrieve API.'
                            });
                        }
                    }
                }),
            })
            .state('api-item-edit', {
                url: '/apis/:id/edit',
                views: getUICompObj('api-editor'),
            })
            .state('api-list', {
                url: '/apis?page',
                views: getUICompObj('api-list', undefined, undefined, {
                    initData: function ($stateParams, $q, apiservice, session) {
                        var page = typeof $stateParams.page !== 'undefined' ? $stateParams.page : 1;
                        var pageSize = session.getPageSize();
                        return apiservice.getPage((page - 1) * pageSize, pageSize)
                            .then(getApiListSuccessful, getApiListFailed);

                        function getApiListSuccessful(result) {
                            return $q.resolve(result);
                        }

                        function getApiListFailed(error){
                            return $q.reject({
                                code: 'NOT_FOUND',
                                message: 'Failed to retrieve APIs.'
                            });
                        }
                    }
                }),
            })
            .state('user-profile-edit', {
                url: '/users/my-profile',
                views: getUICompObj('user-profile-editor'),
            })
            .state('user-profile-view', {
                url: '/users/:id',
                views: getUICompObj('user-profile', undefined, undefined, {
                    initData: function ($q, $state, $stateParams, userservice) {
                        return userservice.getById($stateParams.id)
                            .then(getApiSuccessful, getApiFailed);

                        function getApiSuccessful(result) {
                            return $q.resolve(result);
                        }

                        function getApiFailed(error){
                            return $q.reject({
                                code: 'NOT_FOUND',
                                message: 'Failed to retrieve this User.'
                            });
                        }
                    }
                }),
            })
            .state('user-list', {
                url: '/users?page',
                views: getUICompObj('user-list', undefined, undefined, {
                    initData: function ($stateParams, $q, userservice, session) {
                        var page = typeof $stateParams.page !== 'undefined' ? $stateParams.page : 1;
                        var pageSize = session.getPageSize();
                        return userservice.getPage((page - 1) * pageSize, pageSize)
                            .then(getUserListSuccessful, getUserListFailed);

                        function getUserListSuccessful(result) {
                            return $q.resolve(result);
                        }

                        function getUserListFailed(error){
                            return $q.reject({
                                code: 'NOT_FOUND',
                                message: 'Failed to retrieve users.'
                            });
                        }
                    }
                }),
            })
            .state('error', {
                url: '/error',
                views: getUICompObj('login'),
            });
    }

    function urlConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }

    function AppController () {}
})();
