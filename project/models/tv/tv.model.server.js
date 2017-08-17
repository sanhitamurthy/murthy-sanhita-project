
var mongoose=require('mongoose');
var tvSchema=require('./tv.schema.server');
var tvModel=mongoose.model('tvModel',tvSchema);

tvModel.createTv=createTv;
tvModel.findShowById=findShowById;
tvModel.findAllShows=findAllShows;
tvModel.addReview=addReview;
tvModel.findReviewForShow=findReviewForShow;
tvModel.updateReview=updateReview;
tvModel.deleteReview=deleteReview;

module.exports=tvModel;


function updateReview(review){
    return tvModel
         .findShowById(review.showId)
         .then(function(show){
            var index = show.reviews.indexOf(review);
            show.reviews.splice(index, 1);
            return show.save();
         });
}


function deleteReview(review) {
    return tvModel
        .findShowById(review.showId)
        .then(function (show) {
            var index = show.reviews.indexOf(review);
            show.reviews.splice(index, 1);
            return show.save();
        })
}


function createTv(show){
    return tvModel.create(show);
}

function findShowById(showId){
    return tvModel.findOne({showId: showId});
}

function findAllShows() {
    return tvModel.find();
}


function addReview(showId,review){
    return tvModel.update({'showId':showId},{$push:{reviews:review}});
}

function findReviewForShow(userId,showId){
    return tvModel.findOne({showId:showId});
}