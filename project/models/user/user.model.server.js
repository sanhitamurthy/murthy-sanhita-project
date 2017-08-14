
var mongoose=require('mongoose');
var userSchema=require('./user.schema.server');
var userModel=mongoose.model('userModel',userSchema);

userModel.createUser=createUser;
userModel.findUserById=findUserById;
userModel.findAllUser=findAllUser;
userModel.findUserByUsername=findUserByUsername;
userModel.findUserByCredentials=findUserByCredentials;
userModel.updateUser=updateUser;
userModel.deleteUser=deleteUser;
userModel.findUserByFacebookId=findUserByFacebookId;
userModel.addToFav=addToFav;
userModel.followUser=followUser;
userModel.unfollowUser=unfollowUser;

module.exports=userModel;


function findUserByFacebookId(facebookId){
    return userModel.findOne({'facebook.id':facebookId});

}


function followUser(userId,follow,followers)
{
    console.log(followers)
    return userModel
        .findById(userId)
        .then(function (user) {
            user.following.push(follow);
            return user.save();
        })
        .then(function (user) {
            userModel
                .findById(follow.userId)
                .then(function (user) {
                    user.followers.push(followers);
                    user.save();
                });
        });
}

function unfollowUser(userId,unfollow,followers) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.following.indexOf(unfollow);
            user.following.splice(index, 1);
            return user.save();
        })
        .then(function (user) {
            userModel
                .findById(unfollow.userId)
                .then(function (user) {
                    var i = user.followers.indexOf(followers);
                    user.followers.splice(i, 1);
                    user.save();
                });
        });
}


function addToFav(userId,favorites){
    return userModel
        .update({_id:userId},{$push:{favorites:favorites}});
}

function createUser(user){
    return userModel.create(user);
}

function findUserById(userId){
    return userModel.findById(userId);
}

function findAllUser() {
    return userModel.find();
}

function findUserByUsername(username){
    return userModel.findOne({username:username});
}

function findUserByCredentials(username,password){
    return userModel.findOne({username:username,password:password});
}

function updateUser(userId,newUser){
     delete newUser.username;
    delete newUser.password;
    return userModel.update({_id:userId},{$set:newUser});
}

function deleteUser(userId){
    return userModel.remove({_id:userId});
}
