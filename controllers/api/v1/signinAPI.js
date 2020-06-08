const jwt = require("jsonwebtoken");
const User = require("../../../models/userInfo_model");

module.exports.create_session = async function(req, res){

    try{

        let user = await User.findOne({email : req.body.email});

        if(!user || (user.password != req.body.password) ){
            return res.json(422, {
                message : "Invalid username or password"
            });
        }

        return res.json(200, {
            message : "Sign-in successful and here is your token. Please keepmit safe!!!",
            data : {
                token : jwt.sign(user.toJSON(), 'social_webpage', {expiresIn : '10000'})
            }
        })

    }catch(err){
        console.log("******", err);
        return res.json(200, {
            message : "Internal Server error"
        });
    }

}