angular
    .module('app.header')
    .controller('HeaderController', HeaderController);

function HeaderController($location, authservice, session, logger) {
    var vm = this;

    vm.contentMenu = [
        {title: 'APIs', link: 'apis()'},
        {title: 'Reviews', link: 'main:reviewList()'},
        {title: 'Reviewers', link: 'reviewers()'}];
    vm.userMenu = [
        {title: 'My profile', link: 'userProfile()'},
        {title: 'My reviews', link: 'userReviewList()'}];
    vm.authservice = authservice;
    vm.session = session;
    vm.logout = logout;

    function logout() {
        authservice.logout(function(response) {
            if (response.status == 200) {
                logger.success('Logout successful', response, 'HeaderController');
                $location.path('/');
            }
        });
    }
}
