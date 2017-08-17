(function() {
    angular
        .module('TVApp')
        .factory('tvService', tvService);


    function tvService($http) {

        var api = {
            createTv: createTv,
            findShowById: findShowById,
            addReview: addReview,
            findReviewForShow:findReviewForShow,
            updateReview:updateReview,
            findAllShows:findAllShows,
            deleteReview:deleteReview

        };

        return api;


        function deleteReview(review){
            console.log("client")
            var url="/api/project/deleteReview";
            return $http.put(url,review);
        }


        function findAllShows() {
            var url="/api/project/tv";
            return $http.get(url);

        }
        function updateReview(review){
            var url="/api/project/review";
            return $http.put(url,review);
        }

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

        function findReviewForShow(userId,showId){
            var url="/api/project/reviewCheck/"+userId+"/"+showId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }


    }
})();
