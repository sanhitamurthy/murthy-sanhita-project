
var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var bcrypt = require("bcrypt-nodejs");
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
    // clientID     : "1924159564575285",
    // clientSecret : "cc59790e939f04211fe9754f9bba461d",
    // callbackURL  : "http://localhost:4000/auth/facebook/callback",
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id','email']
};
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

app.get ('/api/project/user/:userId', findUserById);
app.get ('/api/project/user', isAdmin, findAllUsers);
app.get ('/api/project/user/username/:username', findUserByUserName);
app.post('/api/project/user', isAdmin, createUser);
app.put ('/api/project/user/:userId', updateUser);
app.delete ('/api/project/user/:userId', isAdmin, deleteUser);

app.put("/api/project/unfollow/:userId", unfollowUser);
app.put('/api/project/favorites/:userId/:showId', addToFav);
app.post("/api/project/follow/:userId", followUser);


app.post  ('/api/project/login', passport.authenticate('local'), login);
app.get   ('/api/project/loggedin', loggedin);
app.get   ('/api/project/checkAdmin', checkAdmin);
app.post  ('/api/project/logout', logout);
app.post  ('/api/project/register', register);
app.post  ('/api/project/unregister', unregister);

app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/#!/profile/edit',
        failureRedirect: '/#!/login'
    }));

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if (user) {
                return done(null, user);
            } else {

                var names = profile.displayName.split(" ");
                var newUser = {
                    firstName:  names[0],
                    lastName:  names[1],
                    facebook: {
                        id:    profile.id,
                        token: token
                    },
                    role: 'Fan',
                    email: profile.emails[0].value,
                    username: profile.emails[0].value
                };
                userModel
                    .createUser(newUser)
                    .then(function (user) {
                        return done(null, user);
                    }, function (err) {
                        return done(err, null);
                    });
            }
        }, function (err) {
            return done(err, null);
        });
}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.role === 'Admin') {
        next();
    } else {
        res.sendStatus(401);
    }
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                });
        });
}

function unregister(req, res) {
    userModel
        .deleteUser(req.user._id)
        .then(function (user) {
            req.logout();
            res.sendStatus(200);
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function loggedin(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.role === 'Admin') {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)) {
                done(null, user);
            } else {
                done(null, false);
            }
        }, function (error) {
            done(error, false);
        });
}

function login(req, res) {
    res.json(req.user);
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;

    if (user.role !== "Critic" && user.role !== "Fan" && user.role !== "Admin") {
        user.role = "Fan";
    }
    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function createUser(req, res) {
    var user = req.body;

    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });

}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query.password;
    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];


    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user != null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
}

function findUserByUserName(req, res) {
    var username = req.params['username'];
    console.log(username);
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if(user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function followUser(req, res) {
    var userId = req.params["userId"];
    var object = req.body;
    userModel
        .followUser(userId, object.follow, object.followers)
        .then(
            function (response) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            }
        );
}

function unfollowUser(req, res) {
    console.log(req.body);
    var userId = req.params["userId"];
    var object = req.body;

    userModel
        .unfollowUser(userId,object.unfollow,object.followers)
        .then(
            function (response) {
                res.sendStatus(200);
            },
            function (error) {
                res.send(error);

            }
        );
}

function addToFav(req, res) {

    var userId = req.params["userId"];
    favorites=req.body;
    userModel
        .addToFav(userId, favorites)
        .then(function (response) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            });
}