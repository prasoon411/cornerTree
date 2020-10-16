const mongoose = require('mongoose');
//now connect to database that is mongoDB
mongoose.connect('mongodb://localhost/authentication',{ useNewUrlParser: true });
//now accquire that connection
const db= mongoose.connection;
db.on('error',console.error.bind(console,'Error connecting to MongoDB'));
db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});
module.exports=db;