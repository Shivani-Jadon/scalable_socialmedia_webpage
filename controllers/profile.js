const User = require("../models/userInfo_model");
const fs = require('fs');
const path = require('path');

//display profilepage view when profile_of_user is exported
module.exports.profile_of_user = async function(req, res){

    try{

        let user = await User.findById(req.params.id);
        return res.render("profilepage", {title: "User's profile",
                                            profile_user : user});

    }catch(err){
        console.log(`error in displaying profile page : ${err}`);
        return res.render("error", {layout : false});
    }
   
}

// controller for updating user information (name and email)
module.exports.update_user = async function(req, res){

    // function callback using sync await

    if(req.user.id == req.params.id){

        try{
            //await User.findByIdAndUpdate(req.params.id, req.body);

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log("******error in multer*****",err);
                }

                //console.log(req.file);
                user.first_name = req.body.first_name;
                user.last_name = req.body.last_name;
                user.email = req.body.email;

                if(req.file){
                    console.log(req.file);

                    if(user.avatar && fs.existsSync(path.join(__dirname , ".." , user.avatar)))
                    {
                        fs.unlinkSync(path.join(__dirname , ".." , user.avatar));
                    }
                    // saving the uploaded file path in the db
                    user.avatar = User.avatarPath + "/" + req.file.filename;
                }

                user.save();
                req.flash('success', "User successfully updated");
                return res.redirect("back");
            })
        }catch(err){
            req.flash('error',`error in displaying profile page : ${err}`);
            return res.redirect("back");
        }
    }else{
            return res.status("401").send("unauthorised");
    };

    

    // if(req.user.id == req.params.id){

    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         if(err){
    //             console.log(`error in displaying profile page : ${err}`);
    //             return res.render("error", {layout : false});
    //         }

    //         return res.redirect("back");
    //     });
    // }else{
    //     return res.status("401").send("unauthorised");
    // }
}

