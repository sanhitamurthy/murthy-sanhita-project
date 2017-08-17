(function(){
    angular
        .module('TVApp')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUserName: findUserByUserName,
            findUserByCredentials: findUserByCredentials,
            logout: logout,
            register: register,
            checkAdmin: checkAdmin,
            unregister: unregister,
            followUser: followUser,
            unfollowUser : unfollowUser,
            addToFav: addToFav,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            loggedin: loggedin

        };
        return api;



        function followUser(userId, follow, followers) {
            var object = {
                follow: follow,
                followers: followers
            };
            var url = "/api/project/follow/"+userId;
            return $http.post(url, object);
        }

        function unfollowUser(userId, unfollow, followers) {
            var object = {
                unfollow: unfollow,
                followers: followers
            };
            var url = "/api/project/unfollow/"+userId;
            return $http.put(url, object);

        }



        function findUserById(userId) {
            var url = "/api/project/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }


        function findUserByUserName(username) {
            console.log(username);
            console.log("service client")
            var url = "/api/project/user/username/"+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            var url = "/api/project/user";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function deleteUser(userId) {
            var url = "/api/project/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function updateUser(userId, user) {
            var url = "/api/project/user/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/project/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }


        function loggedin() {
            var url = "/api/project/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(userObj) {
            var url = "/api/project/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function unregister(userObj) {
            var url = "/api/project/unregister";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/project/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function addToFav(favorites, userId) {
            var url = "/api/project/favorites/"+ userId + "/" + favorites.id;
            return $http.put(url,favorites);
        }
    }
})();