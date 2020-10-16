const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//for rendering signUP page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/users/profile');
    }
    res.render('signUp', {
        title: "Authenticator Sign-Up"
    });
}
//for rendering signIn page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/users/profile');
    }
    res.render('signIn', {
        title: "Authenticator Sign-In"
    });
}
//for creating new user using signUp form
module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash('success', "Password & Confirm password Dont Match");
        return res.redirect('back');
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
            let newUser = User.create(req.body);
            req.flash('success', "User Created");
            return res.redirect('/users/sign-in');
        } else {
            req.flash('success', "User already Exists");
            res.redirect('back');
        }
    } catch (err) {
        console.log("Error in CREATING", err);
    }
}
//for creating session in sign in
module.exports.createSession = function (req, res) {
    req.flash('success', "Sign-in Successful!");
    return res.redirect('/users/profile');
}
//for redering profile page
module.exports.profile = function (req, res) {
    res.render('profile', {
        title: "Profile"
    });
}
//for logout
module.exports.logout = function (req, res) {

    req.logout();
    req.flash('success', "Sign-out Successfully!");
    return res.redirect('/');
}


//for rendering update page
module.exports.updatePage = function (req, res) {
    res.render('updatePage', {
        title: "Update-Password"
    });
}

//the updatepassword controller
module.exports.updateMain = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            req.flash('success', "Password & Confirm password Dont Match");
            return res.redirect('back');
        }

        let Xuser = await User.findById(req.params.id);

        let compare = await bcrypt.compare(req.body.Old_password, Xuser.password);

        if (!compare) {
            req.flash('success', "Old password is wrong");
            return res.redirect('back');
        } else {
            let newPassword = await bcrypt.hash(req.body.password, saltRounds);

            let newX = await User.findByIdAndUpdate(req.params.id, { password: newPassword });
            req.flash('success', "Password changed successfully");
            return res.redirect('/users/profile');
        }

    } catch (err) {

    }
}