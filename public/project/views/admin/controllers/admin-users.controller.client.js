(function(){
    angular
        .module('TVApp')
        .controller('adminUsersController',adminUsersController);


    function adminUsersController(currentUser,userService){
        var model=this;
        model.currentUser=currentUser;
        model.createUser=createUser;
        model.updateUser=updateUser;
        model.deleteUser=deleteUser;
        model.chooseUser=chooseUser;
        model.renderError=renderError;

        function init(){
            findAllUsers();
        }
        init();



        function findAllUsers(){
            userService
                .findAllUsers()
                .then(function(users){
                    model.users=users;
                })
        }

        function renderError(error){
            model.message="One or more field values are incorrect"
        }

        function createUser(user){


            if(user.role!=='Fan'&&user.role!=='Admin'&&user.role!=='Critic'){
                model.message="Please assign a role ";
                return
            }

            if (user.firstName === null || user.firstName === '' || typeof user.firstName === 'undefined'){
                model.message = "First Name is required";
                return
            }


            if (user.lastName === null || user.lastName === '' || typeof user.lastName === 'undefined'){
                model.message = "Last Name is required";
                return
            }

            userService
                .findUserByUserName(user.username)
                .then(function(response){
                    model.message="Use a different username";
                },
                function(){
                    userService
                        .createUser(user)
                        .then(
                            function(response){
                            model.message="User Created";
                            model.user={};
                            findAllUsers();
                        },renderError);
                })

        }

        function updateUser(user){
            if(user.role!=="Fan"&&user.role!=="Admin"&&user.role!=="Critic"){

                model.message="Please assign a role ";
                return
            }

            if (user.firstName === null || user.firstName === '' || typeof user.firstName === 'undefined'){
                model.message=false;
                model.error = "First Name is required";
                return
            }


            if (user.lastName === null || user.lastName === '' || typeof user.lastName === 'undefined'){

                model.message = "Last Name is required";
                return
            }

            userService
                .updateUser(user._id,user)
                .then(function(response){
                           model.message="User updated";
                           model.user={};
                           findAllUsers();
                       },renderError);
        }

        function chooseUser(user){
            model.message="User selected";
            model.user=angular.copy(user);
        }

        function deleteUser(user){
            userService
                .deleteUser(user._id)
                .then(findAllUsers)
                .then(function(){
                    model.message="User Deleted"
                })

        }

    }
})()