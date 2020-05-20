//display homepage view when home is exported
module.exports.home = function(req, res){
   // printing cookies key and values
   console.log(req.cookies);
   // modifying values for a key in cookie
   res.cookie('user_id', 1919);

   return res.render("homepage", {title: "Home page"});
}

//display this when home is exported
module.exports.home2 = function(req, res){
   return res.send("<h1>Loading home page on express through controller</h1>");
}