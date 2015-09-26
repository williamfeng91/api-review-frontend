(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    function LoginController($scope, $location, authservice, session, toastr, logger) {
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
                $location.path('/');
                toastr.success('Successfully logged in!', 'Welcome ' + session.getCurrentUser().username);
            }

            function loginFailed(response) {
                // FlashService.Error(response.message);
                vm.dataLoading = false;
            }
        };
        $scope.login = vm;
    }

})();
