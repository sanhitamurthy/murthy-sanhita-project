(function(){
    angular
        .module('TVApp')
        .controller('profileEditController',profileEditController);


    function profileEditController($location,currentUser,userService) {

        var model = this;

        model.currentUser = currentUser;
        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.unregister=unregister;


        function init() {
            userService
                .findUserById(model.userId)
                .then(renderUser, userError);
        }

        init();


        function unregister(user){
            userService
                .unregister()
                .then(function () {
                    $location.url('/');
        });
        }

        function renderUser(user) {
            model.user = user;
        };

        function userError(error) {
            model.error = "User not found";
        }

        function updateUser(user) {
            if (user.firstName === null || user.firstName === '' || typeof user.firstName === 'undefined'){
                model.message = "First Name is required";
                return
            }

            if (user.lastName === null || user.lastName === '' || typeof user.lastName === 'undefined'){
                model.message = "Last Name is required";
                return
            }
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User update successful";
                });

        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.message = "Unable to unregister you";
                });

        }


    }

})();
