const User = require("../models/userInfo_model");

//display homepage view when home is exported
module.exports.home = async function(req, res){
   // understanding th working of cookies
   // printing cookies key and values
   //console.log(req.cookies);
   // modifying values for a key in cookie
   //res.cookie('user_id', 1919);

   try{

      let users = await User.find({}).populate({path : 'friends'})

      // users = await User.populate(users, {path : 'friends'})
      
      // let logged_user = await User.findById(locals.user.id).populate({path : 'friends'});

      console.log(users);

      return res.render("homepage", 
                        {title: "Home page",
                         all_users: users});

   }catch(err){
      console.log(`Error : ${err}`);
      return res.render("error", {layout : false});
   }

}

