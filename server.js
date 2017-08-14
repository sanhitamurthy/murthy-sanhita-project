var app = require('./express');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var bodyParser = require('body-parser'); //parse json data
// //from form submissions
var passport=require('passport');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({secret: "text"}));
// app.use(session({secret: process.env.SESSION_SECRET}));

// require('./lectures/session/app');
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

// app.get('/givemetheposts',function(req,res){
//     res.send({message:'hello from the server'});
// })

app.use(app.express.static(__dirname + '/public'));

// require('./test/app');

//var myApp=require('./lectures/app');
// console.log(myApp)
// myApp.sayHello();

//prints in to the console
//myApp(app);

require('./project/app');
require('./utilities/filelist');

app.listen(process.env.PORT || 4000);
