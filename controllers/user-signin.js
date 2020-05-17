// rendering user signin view
module.exports.create_user = function(req, res){

    return res.render("signin", {title : "User Sign-in page"});
}
