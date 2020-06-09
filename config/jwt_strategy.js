const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/userInfo_model");

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'social_webpage'
}


// middleware to extract jwt form token and decrypt payload info 
// jwt_payload will contain payload info and done is a callback function
passport.use(new JWTStrategy(opts, function(jwt_payload, done) {

    User.findById(jwt_payload._id, function(err, user) {
        if (err) {
            console.log("Error in finding user by jwt ", err);
            return;
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));


module.exports = passport;