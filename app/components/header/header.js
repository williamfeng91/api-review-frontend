angular
    .module('app.header')
    .controller('HeaderController', HeaderController);

function HeaderController($location, authservice, session, logger) {
    var vm = this;

    vm.options = [
        {title: 'APIs', link: 'apis()'},
        {title: 'Reviews', link: 'main:reviewList()'},
        {title: 'Reviewers', link: 'reviewers()'}];
    vm.authservice = authservice;
    vm.session = session;
    vm.logout = logout;

    function logout() {
        authservice.logout(function(response) {
            if (response.status == 200) {
                console.log("Logout successful");
                $location.path('/login');
            }
        });
    }
}
