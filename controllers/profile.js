module.exports.profile_of_user = function(req, res){
    return res.render("profilepage", {title: "User's profile", user: "Shivani"});
}

module.exports.userProfile = function(req, res){

    return res.send("<h1>Routing to the profiles page</h1>");
}