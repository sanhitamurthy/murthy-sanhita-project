(function(){
    angular
        .module('TVApp')
        .controller('registerController',registerController);

    function registerController($location,currentUser,userService) {

        var model = this;
        model.register = register;
        this.currentUser=currentUser;


        function register(username, password, password2,firstName,lastName,role) {

            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = "username is required";
                return
            }
            if (password !== password2 || password === null ||
                typeof password === 'undefined') {
                model.error = "passwords must match";
                return
            }
            if (firstName === null || firstName === '' || typeof firstName === 'undefined'){
                model.error = "First Name is required";
                return
            }


            if (lastName === null || lastName === '' || typeof lastName === 'undefined'){
                model.error = "Last Name is required";
                return
            }

            if (role === null || role === '' || typeof role === 'undefined'){
                model.error = "Role is required";
                return
            }


            userService
                .findUserByUserName(username)
                .then(
                    function () {
                        model.error = "sorry, that username is taken";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password,
                            role: role,
                            firstName: firstName,
                            lastName: lastName
                        };

                        return userService
                            .register(newUser);
                    }
                )
                .then(function (user) {
                    $location.url('/profile/'+username);
                });

        }
    }

})();
