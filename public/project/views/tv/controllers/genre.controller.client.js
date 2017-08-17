(function(){
    angular
        .module('TVApp')
        .controller('genreController',genreController);


    function genreController($routeParams,apiService) {
        var model = this;
        model.genreId=$routeParams['genreId'];
        model.findGenreById=findGenreById;
        model.renderShows=renderShows;


        function init()
        {
            console.log(model.genreId)
        findGenreById(model.genreId);
            apiService
            .findShowsByGenreId(model.genreId)
            .then(renderShows);
        }
        init();

        function findGenreById(genreId){
            apiService
                .findAllGenres()
                .then(function(response){
                    var genres=response.data.genres;
                    for(var g in genres ){
                        if(genres[g].id===genreId){
                            model.genreName=genres[g].name;
                        }

                    }
                });
        }

        function renderShows(response){
            model.shows=response.data.results;
        }

    }
    })();
