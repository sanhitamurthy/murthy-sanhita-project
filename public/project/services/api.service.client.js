(function() {
    angular
        .module('TVApp')
        .factory('apiService', apiService);

    function apiService($http) {

        var api = {
            findAllShows: findAllShows,
            findShowById: findShowById,
            findShowsByPopularity: findShowsByPopularity,
            findShowsByGenreId:findShowsByGenreId,
            findAllGenres:findAllGenres
        };

        var key = '590ee6634acbca823183d896221bd971';
        var tv_url = "https://api.themoviedb.org/3";

        return api;


        function findAllGenres(){
                var url = tv_url +"/genre/tv/list?api_key="+key;
            return $http.get(url);
        }


        function findShowsByGenreId(genreId){
                var url = tv_url +"/discover/tv?api_key="+key+"&with_genres="+genreId;
                return $http.get(url);

        }
        function findAllShows(query) {
            var url = tv_url + "/search/tv?api_key=" + key + "&query=" + query;
            return $http.get(url);
        }

        function findShowById(showId) {
            var url = tv_url + "/tv/" + showId + "?api_key=" + key + "&append_to_response=credits,reviews";
            return $http.get(url);
        }


        function findShowsByPopularity() {
            var url = tv_url + "/tv/popular?api_key=" + key;
            return $http.get(url);
        }
    }


})();