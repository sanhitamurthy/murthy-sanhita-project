(function(){
    angular
        .module('TVApp')
        .controller('logoutController',logoutController);

    function logoutController($location,userService,currentUser){

        var model=this;

        model.currentUser=currentUser;

        function init() {
            userService
                .logout()
                .then(
                    function(response) {
                        $location.url("#!/login");
                    })

        }
        init();
    }
})();
