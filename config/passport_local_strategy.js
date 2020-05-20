const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

// user info from database
const user_detail = require("../models/userInfo_model");

// using local passport strategy for user authentication
passport.use(new LocalStrategy({usernameField: 'email'},
            function(email, password, done){

                // find the user in the database
                user_detail.findOne({email: email}, function(err, user){

                    // if error occur done() will send the error to passport
                    if(err){ 
                        console.log("Error in finding user -- Passport");
                        return done(err);
                    }
                    
                    // if user is not found or password incorrect then done() will send err->null & authentication->false 
                    if(!user || user.password != password){
                        console.log("Invalid username/password");
                        return done(null, false);
                    }

                    // if user is found then authentication is completed and the user will be sent
                    return done(null, user);
                });
            }
));


// serialize means request to the browser to store session cookie
// serialize the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user, done){
    // the user id will get stored in the cookie
    return done(null, user.id);                 
});


// deserialize means response to the browser
// deserialize the user from the key in the cookie
passport.deserializeUser(function(id, done){

    // find the user id in the database 
    user_detail.findById(id, function(err, user){
        if(err){
            console.log("Error in finding user id --> Passport");
            return done(err);
        }

        return done(null, user);
    });
});
// serializeUser and deserializeUser uses session cookies which are encrypted


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is authenticated then pass on the function to the next page
    if (req.isAuthenticated()){
        return next();
    }
    // if the user is not logged in
    return res.redirect("/login/user-login");
}


// set the user if authenticated
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains information of the logged in user from the session cookie which is being passed to the locals to be used in views
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;