var app = require('../../express');
var tvModel = require('../models/tv/tv.model.server');

app.get ('/api/project/tv/:showId', findShowById);
app.get ('/api/project/tv',  findAllShows);
app.post('/api/project/tv', createTv);
app.put('/api/project/showReview/:showId', addReview);
app.get('/api/project/reviewCheck/:userId/:showId',findReviewForShow);
app.put('/api/project/review', updateReview);
app.get('/api/project/shows',findAllShows);
app.put('/api/project/deleteReview',deleteReview);


function updateReview(req,res){
    var review=req.body;

    tvModel
        .updateReview(review)
        .then(function (s) {
            tvModel.addReview(review.showId,review)
                .then(function(review){
                res.send(review);

            },function (error) {
                    res.send(error);
                });
        })
        ;

}

function deleteReview(req,res){
    var review=req.body;

    tvModel
        .deleteReview(review)
        .then(function(review){
            res.json(review);
        },function (error) {
            res.send(error);

        });
}



function findReviewForShow(req,res){
    var userId=req.params["userId"];
    var showId=req.params["showId"];
    tvModel
        .findReviewForShow(userId,showId)
        .then(function(review){
            res.json(review);
        },function (error) {
            res.send(error);

        });
}

function findShowById(req, res) {
    var showId = req.params['showId'];

    tvModel
        .findShowById(showId)
        .then(function (show) {
            res.json(show);
        },
        function (error) {
            res.send(error);
        });
}


function findAllShows(req,res) {
    tvModel
        .findAllShows()
        .then(function (shows) {
            res.json(shows);
        },function (error) {
            res.send(error);
        });
}


function createTv(req,res){
    var show = req.body;
    tvModel
        .createTv(show)
        .then(function (shows) {
            res.json(shows);
        },function (error) {
            res.send(error);
        });
}

function addReview(req, res) {
    var review = req.body;
    var showId = req.params["showId"];

    tvModel
        .addReview(showId, review)
        .then(function (rev) {
           res.json(rev);
        })
}