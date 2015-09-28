(function() {
    'use strict';

    angular
        .module('app.api')
        .controller('ApiController', ApiController);

    function ApiController($state, $stateParams, dialogs, apiservice,session,toastr, logger) {
        var vm = this;

        (function initController() {
            // load the API
			apiservice.getById($stateParams.id)
				.then(getApiSuccessful,getApiFailed);
			
			function getApiSuccessful(result) {
				vm.api = result;
				session.setCurrentAPI(vm.api)
			}
			
			function getApiFailed(error){
				$state.go('api-list');
				toastr.error('Failed to retrieve the review. Please try again.')
			}
        })();

         vm.showDialog = function () {
            var dlg = dialogs.confirm(
                'Confirm deletion',
                'Do you really want to delete this api?');
            dlg.result.then(confirmDelete, cancel);

            function confirmDelete(btn) {
                reviewservice.delete(vm.api.id)
                    .then(deleteSuccessful, deleteFailed);

                function deleteSuccessful(result) {
                    $state.go('api-list');
                    toastr.success('Api deleted');
                }

                function deleteFailed(error) {
                    toastr.error('Failed to delete the api. Please try again.');
                }
            }

            function cancel(btn) {
                logger.info('Delete api cancelled');
            }
        }
		
		vm.reload = function () {
            $state.reload();
        }
    }
})();
