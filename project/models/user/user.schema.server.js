var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
    username:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String,
    about:String,
    role:{
        type:String,
        default:'Fan',
        enum:['Fan','Critic','Admin']
    },
    facebook:{
        id:String,
        token:String
    },
    reviews:[{
        tmdbId:Number,
        username:String,
        userId:Number,
        review:String
    }],

    email:String,
    followers:[{userId:String,
                username:String,
                 }],

    following:[{ userId:String,
                 username:String,

                }],

    favorites:[{id:Number,
                name:String,
                poster:String}],

    dateCreated: {type:Date,default:Date.now}
},{collection:"user"});

module.exports=userSchema;