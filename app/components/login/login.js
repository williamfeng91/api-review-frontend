(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'authservice', 'session'];
    function LoginController($location, authservice, session) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            session.destroy();
        })();

        function login() {
            vm.dataLoading = true;
            var credentials = {
                'username': vm.username,
                'password': vm.password
            };
            authservice.login(credentials, function (response) {
                if (response.status == 200) {
                    console.log("Login successful");
                    $location.path('/');
                } else {
                    // FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();