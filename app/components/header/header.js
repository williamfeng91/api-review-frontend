angular
    .module('app.header')
    .controller('HeaderController', HeaderController);

function HeaderController($location, authservice, session, logger) {
    var vm = this;

    vm.contentMenu = [
        {title: 'APIs', link: 'apiList'},
        {title: 'Reviews', link: 'main:reviewList'},
        {title: 'Reviewers', link: 'userList'}];
    vm.userMenu = [
        {title: 'My profile', link: 'userProfile'},
        {title: 'My reviews', link: 'userReviewList'}];
    vm.authservice = authservice;
    vm.session = session;
    vm.logout = logout;

    function logout() {
        authservice.logout()
            .then(logoutSuccessful, logoutFailed);

        function logoutSuccessful(response) {
            $location.path('/');
        }

        function logoutFailed(response) {
        }
    }
}
