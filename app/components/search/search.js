(function() {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    function SearchController(USER_ROLES) {
        var vm = this;
        vm.USER_ROLES = USER_ROLES;
    }

})();
