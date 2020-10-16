//setting up express for our project
const express = require('express');
const port = 8000;
const app = express();
const session = require('express-session');
const passport= require('passport');
const passportLocal = require('./config/passport-local-strategy');
const flash= require('connect-flash');
const customMware= require('./config/middleware');
//for social auth
const passportGoogle= require('./config/passport-google-auth');
//for using mongo-store to solve auto session expire problem
const MongoStore = require('connect-mongo')(session);
app.use(express.urlencoded());
//for connecting to mongoDB
const db= require('./config/mongoose');
const cookieParser = require('cookie-parser');

//for setting up ejs
app.set('view engine','ejs');
app.set('views','./views');

//for static files
app.use(express.static('./assests'));

//for cookies to be recognised by app
app.use(cookieParser());

app.use(session({
    name: 'authenticator',
    //change it for more security
    secret:'12345',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
        if(err){console.log("connect-mongo error",err);}
    })
}));

//you need to tell app to use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//for setting flash
app.use(flash());
app.use(customMware.setFlash);

//for conneting to our Router file
app.use('/',require('./routes/index'));
//firing UP the server
app.listen(port,function(err){
    if(err){console.log("Error in firing up the server",err);}

    console.log("Server running Successfully on port:",port);
});
