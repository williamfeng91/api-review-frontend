(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    function LoginController($state, authservice, session, toastr, logger) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            session.destroy();
        })();

        function login() {
            vm.dataLoading = true;
            authservice.login(vm.credentials)
                .then(loginSuccessful, loginFailed);

            function loginSuccessful(response) {
                $state.go('home');
                toastr.success('Successfully logged in!', 'Welcome ' + session.getCurrentUser().given_name);
            }

            function loginFailed(response) {
                vm.dataLoading = false;
            }
        };
    }

})();
