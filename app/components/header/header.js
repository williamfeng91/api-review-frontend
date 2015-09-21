angular
    .module('app.header')
    .controller('HeaderController', HeaderController);

function HeaderController() {
  this.options = [
    {title: 'APIs', link: 'apis()'},
    {title: 'Reviews', link: 'main:reviewList()'},
    {title: 'Reviewers', link: 'reviewers()'}];
}
