
var mongoose=require('mongoose');
var tvSchema=require('./tv.schema.server');
var tvModel=mongoose.model('tvModel',tvSchema);

tvModel.createTv=createTv;
tvModel.findShowById=findShowById;
tvModel.findAllShows=findAllShows;
tvModel.addReview=addReview;

module.exports=tvModel;


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
    // console.log(review);
    return tvModel.update({'showId':showId},{$push:{reviews:review}});
}
