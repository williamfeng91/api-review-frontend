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

    function stateConfig($locationProvider, $stateProvider, $uiViewScrollProvider, USER_ROLES) {
        $locationProvider.html5Mode({
            enabled: false, // set to true to remove hash. Don't want to set it now because it
                            // doesn't allow access to pages by typing url directly
            requireBase: false
        });
        $uiViewScrollProvider.useAnchorScroll();
        $stateProvider
            .state('home', {
                url: '/',
                data: {
                    requireLogin: false
                },
                views: getUICompObj('home'),
            })
            .state('login', {
                url: '/login',
                data: {
                    requireLogin: false
                },
                views: getUICompObj('login'),
            })
            .state('register', {
                url: '/register',
                data: {
                    requireLogin: false
                },
                views: getUICompObj('register'),
            })
            .state('reset-password', {
                url: '/reset-password',
                data: {
                    requireLogin: false
                },
                views: getUICompObj('reset-password'),
            })
            .state('review-item-new', {
                url: '/reviews/new?api',
                data: {
                    requireLogin: true,
                    authorisedRoles: [USER_ROLES.ADMIN, USER_ROLES.EDITOR, USER_ROLES.REVIEWER]
                },
                views: getUICompObj('review-editor', undefined, undefined, {
                    initData: function () {
                        return {
                            'title': '',
                            'content': '',
                            'description': '',
                            'api': {},
                            'tags': []
                        };
                    }
                }),
            })
            .state('review-item-view', {
                url: '/reviews/:id',
                data: {
                    requireLogin: true,
                    authorisedRoles: [USER_ROLES.ALL]
                },
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
                                code: error.status,
                                message: error.data.message
                            });
                        }
                    }
                }),
            })
            .state('review-item-edit', {
                url: '/reviews/:id/edit',
                data: {
                    requireLogin: true,
                    authorisedRoles: [USER_ROLES.ADMIN, USER_ROLES.EDITOR, USER_ROLES.REVIEWER]
                },
                views: getUICompObj('review-editor', undefined, undefined, {
                    initData: function ($q, $stateParams, authservice, reviewservice, session) {
                        var review = session.getCurrentReview();
                        if (review == null || review.id != $stateParams.id) {
                            var deferred = $q.defer();
                            reviewservice.getById($stateParams.id)
                                .then(getReviewSuccessful, getReviewFailed);
                            return deferred.promise;
                        } else {
                            // check if the current user is the author
                            if (authservice.belongsTo(review.author.id)) {
                                return review;
                            } else {
                                return $q.reject({
                                    code: 403,
                                    message: 'No permission to edit the review.'
                                });
                            }
                        }

                        function getReviewSuccessful(result) {
                            // check if the current user is the author
                            if (authservice.belongsTo(result.author.id)) {
                                deferred.resolve(result);
                            } else {
                                deferred.reject({
                                    code: 403,
                                    message: 'No permission to edit the review.'
                                });
                            }
                        }

                        function getReviewFailed(error) {
                            return $q.reject({
                                code: error.status,
                                message: error.data.message
                            });
                        }
                    }
                }),
            })
            .state('review-list', {
                url: '/reviews',
                data: {
                    requireLogin: true,
                    authorisedRoles: [USER_ROLES.ALL]
                },
                views: getUICompObj('review-list'),
            })
            .state('api-item-new', {
                url: '/apis/new',
                data: {
                    requireLogin: true,
                    authorisedRoles: [USER_ROLES.ADMIN, USER_ROLES.EDITOR, USER_ROLES.REVIEWER]
                },
                views: getUICompObj('api-editor'),
            })
            .state('api-item-view', {
                url: '/apis/:id',
                data: {
                    requireLogin: true,
                    authorisedRoles: [USER_ROLES.ALL]
                },
                views: getUICompObj('api', undefined, undefined, {
                    initData: function ($q, $state, $stateParams, apiservice) {
                        return apiservice.getById($stateParams.id)
                            .then(getApiSuccessful, getApiFailed);

                        function getApiSuccessful(result) {
                            return $q.resolve(result);
                        }

                        function getApiFailed(error){
                            return $q.reject({
                                code: error.status,
                                message: error.data.message
                            });
                        }
                    }
                }),
            })
            .state('api-item-edit', {
                url: '/apis/:id/edit',
                data: {
                    requireLogin: true,
                    authorisedRoles: [USER_ROLES.ADMIN, USER_ROLES.EDITOR, USER_ROLES.REVIEWER]
                },
                views: getUICompObj('api-editor'),
            })
            .state('api-list', {
                url: '/apis?page',
                data: {
                    requireLogin: true,
                    authorisedRoles: [USER_ROLES.ALL]
                },
                views: getUICompObj('api-list', undefined, undefined, {
                    initData: function ($q, $stateParams, apiservice, session) {
                        var page = typeof $stateParams.page !== 'undefined' ? $stateParams.page : 1;
                        var pageSize = session.getPageSize();
                        return apiservice.getPage((page - 1) * pageSize, pageSize)
                            .then(getApiListSuccessful, getApiListFailed);

                        function getApiListSuccessful(result) {
                            return $q.resolve(result);
                        }

                        function getApiListFailed(error){
                            return $q.reject({
                                code: error.status,
                                message: error.data.message
                            });
                        }
                    }
                }),
            })
            .state('user-profile-edit', {
                url: '/users/my-profile',
                data: {
                    requireLogin: true,
                    authorisedRoles: [USER_ROLES.ALL]
                },
                views: getUICompObj('user-profile-editor'),
            })
            .state('user-profile-view', {
                url: '/users/:id',
                data: {
                    requireLogin: true,
                    authorisedRoles: [USER_ROLES.ALL]
                },
                views: getUICompObj('user-profile', undefined, undefined, {
                    initData: function ($q, $stateParams, userservice) {
                        return userservice.getById($stateParams.id)
                            .then(getUserSuccessful, getUserFailed);

                        function getUserSuccessful(result) {
                            return $q.resolve(result);
                        }

                        function getUserFailed(error){
                            return $q.reject({
                                code: error.status,
                                message: error.data.message
                            });
                        }
                    }
                }),
            })
            .state('user-list', {
                url: '/users?page',
                data: {
                    requireLogin: true,
                    authorisedRoles: [USER_ROLES.ALL]
                },
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
                                code: error.status,
                                message: error.data.message
                            });
                        }
                    }
                }),
            })
            .state('error', {
                url: '/error?type',
                data: {
                    requireLogin: false
                },
                views: getUICompObj('error'),
            })
            .state('test', {
                url: '/test',
                data: {
                    requireLogin: false
                },
                views: getUICompObj('test'),
            });
    }

    function urlConfig($urlRouterProvider) {
        $urlRouterProvider
            .when('', '/')
            .otherwise('/error');
    }

    function AppController () {}
})();
