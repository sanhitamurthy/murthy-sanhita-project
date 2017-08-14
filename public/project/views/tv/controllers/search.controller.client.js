(function(){
    angular
        .module('TVApp')
        .controller('searchController',searchController);

    //$ means created by underlined framework
    function searchController($routeParams,apiService,currentUser) {

        var model = this;

        model.query = $routeParams.query;
        model.renderShows = renderShows;
        model.currentUser = currentUser;



        function init() {
            apiService
                .findAllShows(model.query)
                .then(renderShows);

        }

        init();

        function renderShows(shows) {
            model.shows = shows.data.results;
        }
    }
})();
