var app = require('../../express');
var tvModel = require('../models/tv/tv.model.server');

app.get ('/api/project/tv/:showId', findShowById);
app.get ('/api/project/tv',  findAllShows);
app.post('/api/project/tv', createTv);
app.put('/api/project/showReview/:showId', addReview);

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
    console.log(review);

    tvModel
        .addReview(showId, review)
        .then(function (rev) {
           res.json(rev);
        })
}