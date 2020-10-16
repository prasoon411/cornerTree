//configuration for using passport as authenticator
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//configguring passport
passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback: true

},
    function (req, email, password, done) {

        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('error in finding USER-->passport', err);
                return done(err);
            }
            if (!user) {
                req.flash('success', "Invalid Username/Password");
                return done(null, false)
            } else {
                bcrypt.compare(password, user.password, function (err, getUser) {
                    if (!getUser) {
                        req.flash('success', "Invalid Username/Password");
                        return done(null, false)
                    }
                    return done(null, user);
                });
            }
        })
    }
));
//serializing for creating a cookie and pasting id to it,it decides which key to be kept in cookie
passport.serializeUser(function (user, done) {
    done(null, user.id)
});
//deserializing user from cookie
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("##error", err);

            return done(err);
        }
        return done(null, user);
    });
});

//check if the user is authenticated

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        // if the user is signed in, then pass on the request to the next function(controller's action)
        return next();
    }
    //if not make him to sign in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

