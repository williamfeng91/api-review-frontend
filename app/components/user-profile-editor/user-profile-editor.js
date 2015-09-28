(function() {
    'use strict';

    angular
        .module('app.userProfileEditor')
        .controller('UserProfileEditorController', UserProfileEditorController);

    /** @ngInject */
    function UserProfileEditorController($state, userservice, session, toastr, logger) {
        var vm = this;

        vm.submit = submitUserProfile;
        vm.resetForm = resetForm;
        vm.currentUser = angular.copy(session.getCurrentUser());

        function submitUserProfile() {
            vm.dataLoading = true;
            logger.log(vm.currentUser);
            userservice.update(vm.currentUser)
                    .then(updateUserProfileSuccessful, updateUserProfileFailed);

            function updateUserProfileSuccessful(result) {
                vm.dataLoading = false;
                toastr.success('Successfully updated!', 'User Profile');
            }

            function updateUserProfileFailed(error) {
                vm.dataLoading = false;
                toastr.error('Failed to submit API. Please try again.');
            }
        }

        function resetForm() {
            vm.currentUser = angular.copy(session.getCurrentUser());
        }
    }
})();
