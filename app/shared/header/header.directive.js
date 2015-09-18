(function() {
	'use strict';

	angular
		.module('app.header')
		.directive('arHeader', function() {
			return {
				restrict: 'E',
				templateUrl: 'app/shared/header/header.html',
				controllerAs: 'headerCtrl',
				controller: function() {

				}
			};
		});
})();