
var mongoose=require('mongoose');
var connectionString='mongodb://localhost/webdev_project';

if(process.env.MLAB_USERNAME){
    connectionString="monodb://"+
            process.env.MLAB_USERNAME+":"+
            process.env.MLAB_PASSWORD+"@"+
            process.env.MLAB_HOST+":"+
            process.env.MLAB_PORT+"/"+
            process.env.MLAB_APP_NAME;

}


mongoose.connect(connectionString);

mongoose.Promise = require('q').Promise;


require('./services/user.service.server');
require('./services/tv.service.server');




