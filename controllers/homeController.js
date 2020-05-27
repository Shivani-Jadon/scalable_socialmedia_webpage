const User = require("../models/userInfo_model");

//display homepage view when home is exported
module.exports.home = function(req, res){
   // understanding th working of cookies
   // printing cookies key and values
   //console.log(req.cookies);
   // modifying values for a key in cookie
   //res.cookie('user_id', 1919);

   User.find({}, function(err, users){

      return res.render("homepage", 
                        {title: "Home page",
                         all_users: users});
   });

}

