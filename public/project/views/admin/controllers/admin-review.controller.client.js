(function() {
    angular
        .module('TVApp')
        .controller('adminReviewController', adminReviewController);


    function adminReviewController(currentUser, tvService,apiService) {

        var model = this;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;
        model.selectReview=selectReview;
        model.renderError=renderError;
        model.currentUser = currentUser;


        function init() {

            console.log("controller");
            findAllReviews();
            return;

        }

        init();

        function findAllReviews() {
            tvService
                .findAllShows()
                .then(function (response) {
                    var shows = response.data;
                    console.log(shows);
                    model.result = [];
                    for (var show in shows) {
                        for (var review in shows[show].reviews) {
                            model.result.push(shows[show].reviews[review]);
                        }
                    }
                });
        }


        function updateReview(review){
            tvService
                .updateReview(review)
                .then(findAllReviews)
                .then(function(){
                    model.message="Review Updated";
                })
        }

        function deleteReview(review){
            tvService
                .deleteReview(review)
                .then(findAllReviews)
                .then(function(){
                    model.message="Review Deleted"
                })
        }

        function selectReview(review){
            model.review=angular.copy(review);
        }

        function renderError(error) {
         model.message="Something went wrong";
        }
    }
})();