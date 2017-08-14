(function() {
    angular
        .module('TVApp')
        .factory('tvService', tvService);


    function tvService($http) {

        var api = {
            createTv: createTv,
            findShowById: findShowById,
            addReview: addReview
        };

        return api;

        function createTv(show) {
            var url = "/api/project/tv";
            return $http.post(url, show)
                .then(function (response) {
                    return response.data;
                });
        }

        function findShowById(showId) {
            var url = "/api/project/tv/"+showId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addReview(review, showId) {
            var url = "/api/project/showReview/"+showId;
            return $http.put(url, review)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();
