(function() {
    'use strict';

    angular
        .module('app.footer')
        .controller('FooterController', FooterController);

    function FooterController(USER_ROLES) {
        var vm = this;
        vm.USER_ROLES = USER_ROLES;
    }

})();
