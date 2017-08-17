var app = require('./express');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var bodyParser = require('body-parser');
var passport=require('passport');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({secret: "text"}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');


app.use(app.express.static(__dirname + '/public/project'));

require('./project/app');
require('./utilities/filelist');

app.listen(process.env.PORT || 4001);
