const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');

//routes for signIN signUP
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
//for creating user
router.post('/create', usersController.create);
//for updating passwords
router.get('/updatePage', passport.checkAuthentication, usersController.updatePage);
router.post('/updateMain/:id', passport.checkAuthentication, usersController.updateMain);
//creating session
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' },
), usersController.createSession);
router.get('/profile', passport.checkAuthentication, usersController.profile);
//for logout
router.get('/logout', usersController.logout);
//social auth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in' }), usersController.createSession);
module.exports = router;