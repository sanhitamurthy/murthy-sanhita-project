(function(){
    angular
        .module('TVApp')
        .controller('loginController',loginController);

    function loginController($location,userService,currentUser){

        var model=this;

        model.login=login;
        model.currentUser=currentUser;


        function login(username, password) {
            userService
                .login(username, password)
                .then(login,errorHandler);

            function login (result) {
                if(result !== null) {
                    $location.url('/profile/'+username);
                } else {
                    model.message = "Wrong Username or Password.";
                }
            }

            function errorHandler (error) {
                model.message = "Wrong UserName or Password.";
            }
        }
    }
})();
