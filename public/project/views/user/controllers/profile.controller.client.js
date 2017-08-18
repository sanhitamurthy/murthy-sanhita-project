(function(){
    angular
        .module('TVApp')
        .controller('profileController',profileController);

    function profileController($routeParams,currentUser,userService) {

        var model = this;

        model.currentUser = currentUser;
        model.userName=$routeParams['username'];
        model.followUser=followUser;
        model.unfollowUser=unfollowUser;



        function init() {
            userService
                .findUserByUserName(model.userName)
                .then(renderUser, ErrorHandler);

        }

        init();


        function renderUser(user) {
            model.user = user;
            model.userId=model.user._id;
            checkFollow();
        };

        function ErrorHandler(error) {
            model.error = "User not found";
        }


        function checkFollow(){
            model.following=false;
            userService
                .findUserById(currentUser._id)
                .then(function(response){
                    var follows=response.following;
                    for(var f in follows){
                        if(follows[f].username=== model.userName){
                            model.following=true;
                            return;
                        }

                    }

                })

        }

        function followUser() {
            userService
                .findUserById(currentUser._id)
                .then(function (response) {
                    var follows = response.following;
                    for (var f in follows) {
                        if (follows[f].username === model.userName) {
                            model.error = "You are already following the user";
                            return;
                        }

                    }

                    userService
                        .findUserByUserName(model.userName)
                        .then(function (response) {
                            var userId = response._id;

                            var following = {
                                userId: userId,
                                username: model.userName
                            };
                            var followers={
                                userId:currentUser._id,
                                username:currentUser.username
                            }

                            userService
                                .followUser(currentUser._id, following,followers)
                                .then(function (res) {

                                    if (res) {
                                        model.message = "You are now following the user";
                                        model.following=true;

                                    }
                                    else {
                                        model.error = "Something went wrong!"

                                    }

                                });


                        });
                });
        }



        function unfollowUser() {
            userService
                .findUserByUserName(model.userName)
                .then(function (response) {
                    var userId = response._id;

                    var following = {
                        userId: userId,
                        username: model.userName
                    };

                    var followers={
                        userId:currentUser._id,
                        username:currentUser.username
                    }

                    userService
                        .unfollowUser(currentUser._id,following,followers)
                        .then(function (res) {

                            if (res) {
                                model.message = "You are now not following the user";
                                model.following = false;

                            }
                            else {
                                model.error = "Something went wrong!"

                            }

                        });


                });
        }
    }

})();
