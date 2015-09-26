(function() {
    'use strict';

    angular.module('app', [
      'ui.router',
      'app.header',
      'app.footer',
      'app.home',
      'app.login',
      'app.register',
      'app.review',
      'app.reviewEditor',
      'app.reviewList'
    ])
      .config(stateConfig)
      .controller('AppController', AppController);

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getControllerName(name) {
      return name.split('-').map(function(item){
        return capitalizeFirstLetter(item);
      }).join('');
    }

    function getSubCompObj(component) {
      return {
        templateUrl: 'app/components/' + component + '/' + component + '.html',
        controller: getControllerName(component) + 'Controller'
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

    function stateConfig($stateProvider, $urlRouterProvider) {
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
        .state('reviews-item-view', {
          url: '/reviews/:id',
          views: getUICompObj('review')
        })
        .state('reviews-item-edit', {
          url: '/reviews/:id/edit',
          views: getUICompObj('review-editor')
        })
        .state('reviews-item-new', {
          url: '/reviews/new',
          views: getUICompObj('review-editor')
        })
        .state('reviews', {
          url: '/reviews',
          views: getUICompObj('review-list')
        });
    }

    function AppController () {}
})();
