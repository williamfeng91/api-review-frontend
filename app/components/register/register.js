(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, userservice, logger) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            userservice.create(vm.user)
                .then(registerSuccessful, registerFailed);

            function registerSuccessful(response) {
                $location.path('/login');
            }

            function registerFailed(response) {
                // FlashService.Error(response.message);
                vm.dataLoading = false;
                vm.error = "Registration failed";
            }
        };
    }

})();