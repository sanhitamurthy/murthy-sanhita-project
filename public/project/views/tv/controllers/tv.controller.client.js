(function(){
    angular
        .module('TVApp')
        .controller('tvController',tvController);

    //$ means created by underlined framework
    function tvController($routeParams,apiService,currentUser,userService,tvService) {

        var model = this;


        model.showId=$routeParams['showId'];
        model.favorites=currentUser.favorites;

        model.currentUser = currentUser;
        model.findShowById=findShowById;
        model.createTv=createTv;
        model.addReview=addReview;
        model.addToFav=addToFav;
        model.checkNumberOfReview=checkNumberOfReview;


        function init(){
            findShowById(model.showId)
                .then(function(res){
                    createTv(res);

                })
            .then(checkNumberOfReview);
        }

        init();

        function findShowById(showId){
            return apiService
                .findShowById(showId)
                .then(function(response){
                    model.show=response.data;
                    model.showName=response.name;
                    model.backdrop_path=response.data.backdrop_path;
                })
        }

        function createTv(res){
            return tvService
                .findShowById(model.showId)
                .then(function(response) {
                    if (response == null) {
                        var tv = {
                            showId: model.show.id,
                            name: model.show.name

                        };
                        tvService
                            .createTv(tv)
                        .then(
                            tvService
                                .findShowById(model.showId)
                                .then(function(show){
                                    model.showFromDb=show;
                        })
                        );
                    }
                     else{
                        tvService
                            .findShowById(model.showId)
                            .then(function(show){
                                model.showFromDb=show;
                            })

                     }
                });

        }

        function addToFav(show){
            tvService
                .findShowById(model.showId)
                .then(function(response){
                    var showId=response.showId;
                    var favorites={
                        id:showId,
                        name:response.name,
                        poster:model.backdrop_path
                    };
                    userService
                        .findUserById(model.currentUser._id)
                        .then(function(response){
                            for(var f in response.favorites) {
                                if (response.favorites[f].id === showId) {
                                   model.error="Already in Favorites";
                                   model.message=false;
                                   return;
                                }
                            }
                            userService
                                .addToFav(favorites, model.currentUser._id)
                                .then(function (response) {
                                    model.message = "Added to Favorite";

                                });

                        });


                });


        }


        function addReview(comment){
            var review = {
                showId:model.showId,
                userId:model.currentUser._id,
                username:model.currentUser.username,
                review:comment

            };
            tvService
                .addReview(review,model.show.id)
                .then(function(){
                    model.message="Posted succesfully"
                });

        }



        function checkNumberOfReview(){
                    tvService
                        .findReviewForShow(model.currentUser._id,model.showId)
                        .then(function(response){
                            if (response.reviews.length)
                                for (var review in response.reviews) {
                                    if(response.reviews[review].userId === model.currentUser._id) {
                                        model.hasReviewed=false;
                                        break;
                                    }
                                    else
                                        model.hasReviewed=true;
                                }
                            else
                                model.hasReviewed=true;

                        })

        }



    }
})();
