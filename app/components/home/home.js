angular
    .module('app.home', ['app.services'])
    .controller('HomeController',['dataservice',HomeController]);

function HomeController(dataservice) {
}
