const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require("../models/userInfo_model");


passport.use(new googleStrategy({
    clientID : "333670166525-n5p3or1qf799e19drresr827mvh7sp5h.apps.googleusercontent.com",
    clientSecret : "gEwkHEY-qnpI4AwJ5_qJwoIl",
    callbackURL : "http://localhost:8000/check_account/authenticate/google/callback"
    },

    // function to generate token for google authentication which is accessToken
    // refreshToken is generated when demanded used to provide refresh token is access token expires without need of google sign-in
    // profile contains user info from google account
    function(accessToken, refreshToken, profile, done){

        // find the user in the database
        User.findOne({email : profile.emails[0].value}).exec(function(err, user){
            
            if(err){
                console.log("Error in google passport authentication", err);
                return;
            }
            
            console.log(profile);
            console.log(profile.given_name, profile.family_name);
            
            // if the user is present then return null error and user
            if(user){
                return done(null, user);
            }
            // if user is not present then create user and return user
            else{
                User.create({                        
                        email : profile.emails[0].value,
                        password : crypto.randomBytes(20).toString('hex'),
                        first_name : profile.name.givenName,
                        last_name : profile.name.familyName
                    }, function(err, user){
                        if(err){
                            console.log("Error in creating user : ", err);
                            return;
                        }
                        return done(null, user);
                    }
                )                
            }            
        })        
    }) 
);


module.exports = passport;