var mongoose=require('mongoose');

var tvSchema=mongoose.Schema({
    showId:Number,
    name:String,
    reviews:[{
        showId:Number,
        userId:String,
        username:String,
        review:String
    }],
    dateCreated: {type:Date,default:Date.now}
},{collection:"tv"});

module.exports=tvSchema;