(function(){
    angular
        .module('TVApp')
        .controller('adminUserController',adminUserController)


    function adminUserController(currentUser,useService){
        var model=this;
        model.currentUser=currentUser;
        model.createUser=createUser;
        model.updateUser=updateUser;
        model.deleteUser=deleteUser;
        model.selectUser=selectUser;
        model.renderError=renderError;

        function init(){
            findAllUsers();
        }
        init();

        function createUser(user){
            if(user.role!=="Fan"||user.role!=="Admin"||user.role!=="Critic"){
                message=false;
                model.error="Please assign a role ";
                return
            }

            if (user.firstName === null || user.firstName === '' || typeof user.firstName === 'undefined'){
                model.message=false;
                model.error = "First Name is required";
                return
            }


            if (user.lastName === null || user.lastName === '' || typeof user.lastName === 'undefined'){
                model.message=false;
                model.error = "Last Name is required";
                return
            }

            useService
                .findUserByUsername(user.username)
                .then(function(){
                    model.error="Use a different username";
                },
                function(){
                    useService
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
            if(user.role!=="Fan"||user.role!=="Admin"||user.role!=="Critic"){
                message=false;
                model.error="Please assign a role ";
                return
            }

            if (user.firstName === null || user.firstName === '' || typeof user.firstName === 'undefined'){
                model.message=false;
                model.error = "First Name is required";
                return
            }


            if (user.lastName === null || user.lastName === '' || typeof user.lastName === 'undefined'){
                model.message=false;
                model.error = "Last Name is required";
                return
            }

            useService
                .updateUser(user.id,user)
                .then(function(response){
                           model.message="User updated";
                           model.user={};
                           findAllUsers();
                       },renderError);
        }

        function selectUser(user){
            model.message="User selected";
            model.user=angular.copy(user);
        }

        function deleteUser(user){
            useService
                .deleteUser(user._id)
                .then(findAllUsers)
                .then(function(){
                    model.message="User Deleted"
                })

        }

        function findAllUsers(){
            useService
                .findAllUsers()
                .then(function(users){
                    model.users=users;
                })
        }

        function renderError(error){
            model.error="One or more field values are incorrect"
        }




    }
})()