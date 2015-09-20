(function() {
    'use strict';

    angular.module('app', [
      'ngNewRouter',
      'app.header',
      'app.footer',
      'app.home'])
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
      { path: '/review/:id', component: 'review' }
    ];
    function AppController ($router) {}
})();
