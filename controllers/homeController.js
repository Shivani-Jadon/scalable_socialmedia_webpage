module.exports.home = function(req, res){
   return res.render("homepage", {title: "Home page", user: "Shivani"});
}

module.exports.home2 = function(req, res){
   return res.send("<h1>Loading home page on express through controller</h1>");
}