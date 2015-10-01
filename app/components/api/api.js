(function() {
    'use strict';

    angular
        .module('app.api')
        .controller('ApiController', ApiController);

    /** @ngInject */
    function ApiController($state, initData, dialogs, apiservice, session, toastr, logger) {
        var vm = this;

        vm.api = initData;
		session.setCurrentAPI(vm.api);

        vm.showDialog = function () {
            var dlg = dialogs.confirm(
                'Confirm deletion',
                'Do you really want to delete this API?');
            dlg.result.then(confirmDelete, cancel);

            function confirmDelete(btn) {
                apiservice.delete(vm.api.id)
                    .then(deleteSuccessful, deleteFailed);

                function deleteSuccessful(result) {
                    $state.go('api-list');
                    toastr.success('API deleted');
                }

                function deleteFailed(error) {
                    toastr.error('Failed to delete the API. Please try again.');
                }
            }

            function cancel(btn) {
                logger.info('Delete API cancelled');
            }
        }

		vm.reload = function () {
            $state.reload();
        }
    }
})();
