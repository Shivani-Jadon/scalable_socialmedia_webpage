//display profilepage view when profile_of_user is exported
module.exports.profile_of_user = function(req, res){
    return res.render("profilepage", {title: "User's profile"});
}

//display this when userProfile is exported
module.exports.userProfile = function(req, res){

    return res.send("<h1>Routing to the profiles page</h1>");
}