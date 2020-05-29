// logging in the user and creating session for the user

module.exports.verify_user = function(req, res){

   // stroing flash message in session cookies
   req.flash('success', "Successfully logged in");
   return res.redirect('/');
}