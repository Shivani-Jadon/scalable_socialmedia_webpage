// user info from database
const user_detail = require("../models/userInfo_model");

module.exports.add_new_user = function(req, res){

    user_detail.create({
        first_name : req.body.first_name,
        last_name  : req.body.last_name,
        email : req.body.email,
        password : req.body.password
    }, function(err, newUser){

        if(err)
        {
            console.log(`Error in updating data in database ${err}`);
            return;
        }

        return res.send("<h1>Your user account has been successfully created");
    })
}