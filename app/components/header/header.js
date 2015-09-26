angular
    .module('app.header', [
      'app.services',
      'ngCookies',
    ])
    .controller('HeaderController', HeaderController);

function HeaderController($scope, $location, authservice, session, logger) {
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

    $scope.vm = vm;

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
