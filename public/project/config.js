(function(){
    angular
        .module('TVApp')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/tv/templates/home.view.client.html',
                controller: 'homeController',
                controllerAs: 'model',
                resolve:
                   {
                    currentUser: checkCurrentUser
                   }


            })

            .when('/login', {
                    templateUrl: 'views/user/templates/login.view.client.html',
                    controller: 'loginController',
                    controllerAs: 'model',
                    resolve: {
                        currentUser: checkGuest
                    }

                }
            )


            .when('/logout', {
                    templateUrl: 'views/user/templates/login.view.client.html',
                    controller: 'logoutController',
                    controllerAs: 'model',
                    resolve: {
                        currentUser: checkLoggedIn
                    }

                }
            )

            .when('/register', {
                    templateUrl: 'views/user/templates/register.view.client.html',
                    controller: 'registerController',
                    controllerAs: 'model',
                    resolve: {
                        currentUser: checkGuest
                    }

                }
            )


            .when('/profile/edit', {
                    templateUrl: 'views/user/templates/profile-edit.view.client.html',
                    controller: 'profileEditController',
                    controllerAs: 'model',
                    resolve: {
                        currentUser: checkLoggedIn
                    }

                }
            )


                .when('/profile/:username', {
                        templateUrl: 'views/user/templates/profile.view.client.html',
                        controller: 'profileController',
                        controllerAs: 'model',
                        resolve: {
                            currentUser: checkLoggedIn
                        }

                    }
                )


            .when('/search/:query', {
                    templateUrl: 'views/tv/templates/search.view.client.html',
                    controller: 'searchController',
                    controllerAs: 'model',
                    resolve: {
                        currentUser: checkCurrentUser
                    }

                }
            )
            .when('/tv/:showId', {
                    templateUrl: 'views/tv/templates/tv.view.client.html',
                    controller: 'tvController',
                    controllerAs: 'model',
                    resolve: {
                        currentUser: checkCurrentUser
                    }

                }
            )

            .when('/admin', {
                    templateUrl: 'views/admin/templates/main.view.client.html',
                    controller: 'adminController',
                    controllerAs: 'model',
                    resolve: {
                        currentUser: checkAdmin
                    }

                }
            )


            .when('/admin/user', {
                    templateUrl: 'views/admin/templates/main-user.view.client.html',
                    controller: 'adminUsersController',
                    controllerAs: 'model',
                    resolve: {
                        currentUser: checkAdmin
                    }

                }
            )







    }


    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if (user === '0') {
                    deferred.resolve({});
                    // $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }


    function checkGuest(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if (user === '0') {
                    deferred.resolve({});

                } else {
                    deferred.resolve(user);
                    $location.url('/profile/'+user.username);
                }
            });

        return deferred.promise;
    }

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .checkAdmin()
            .then(function (user) {
                if (user === '0') {
                    deferred.resolve({});
                    $location.url('/');

                } else {
                    deferred.resolve(user);

                }
            });

        return deferred.promise;
    }
})();
