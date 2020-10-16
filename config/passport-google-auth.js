const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
//we need to tell passport to use google oauth
//for using dotenv
require('dotenv').config()
passport.use(new googleStrategy({
    clientID: process.env.client_id,
    clientSecret: process.env.client_secret,
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},

    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) { console.log("error in @##@", err); return; }

            if (user) {
                //if user is found set it to req.user
                return done(null, user);
            } else {
                //if not create one and set it to req.user(*sign in him)
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) {
                        console.log("error in @#-,-#@", err);
                    }
                    return done(null, user);
                })

            }
        })
    }
))

module.exports = passport;