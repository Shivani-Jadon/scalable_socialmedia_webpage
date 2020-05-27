const User = require("../models/userInfo_model");

//display profilepage view when profile_of_user is exported
module.exports.profile_of_user = function(req, res){

    User.findById(req.params.id , function(err, user){
        if(err){
            console.log(`error in displaying profile page : ${err}`);
            return res.render("error", {layout : false});
        }

        return res.render("profilepage", {title: "User's profile",
                                            profile_user : user});
         
    })
    
}

