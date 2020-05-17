// rendering user login view
module.exports.validate_user = function(req, res){

    return res.render("login", {title : "User Login page"});
}
