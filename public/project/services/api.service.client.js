(function() {
    angular
        .module('TVApp')
        .factory('apiService', apiService);

    function apiService($http) {

        var api = {
            findAllShows: findAllShows,
            findShowById: findShowById,
            findShowsByPopularity: findShowsByPopularity
        };

        var key = '590ee6634acbca823183d896221bd971';
        var tv_url = "https://api.themoviedb.org/3";

        return api;

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