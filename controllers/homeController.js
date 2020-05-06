//display homepage view when home is exported
module.exports.home = function(req, res){
   return res.render("homepage", {title: "Home page", user: "Shivani"});
}

//display this when home is exported
module.exports.home2 = function(req, res){
   return res.send("<h1>Loading home page on express through controller</h1>");
}