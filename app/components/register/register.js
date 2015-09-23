(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', 'authservice', 'session'];
    function RegisterController($location, authservice, session) {
        var vm = this;
    }

})();