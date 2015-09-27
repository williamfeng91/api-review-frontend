(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterController', RegisterController);

    function RegisterController($state, userservice, logger) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            userservice.create(vm.user)
                .then(registerSuccessful, registerFailed);

            function registerSuccessful(response) {
                $state.go('login');
            }

            function registerFailed(response) {
                vm.dataLoading = false;
                vm.error = "Registration failed";
            }
        };
    }

})();
