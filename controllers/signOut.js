const passport = require('passport');

// controller handling signing out of user
module.exports.expire_session = function(req, res){
    // passport.js function to expire a session
    req.logout();
    // the user will be redirected to home page
    return res.redirect("/");
}