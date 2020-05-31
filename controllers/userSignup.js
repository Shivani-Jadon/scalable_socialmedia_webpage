const passport = require('passport');

// rendering user signup view
module.exports.create_user = function(req, res){

    
    if(req.isAuthenticated()){

        let id = res.locals.user._id;
        // flash alert msg
        req.flash('error', "Already signed in");
        return res.redirect(`/user/profile/${id}`);
        //return res.redirect("back");
    }

    return res.render("signup", {title : "User Sign-up page"});
}
