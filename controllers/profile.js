const User = require("../models/userInfo_model");

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
    try{

        if(req.user.id == req.params.id){

            await User.findByIdAndUpdate(req.params.id, req.body);

            req.flash('success', "User successfully updated");
            return res.redirect("back");
        }else{
            return res.status("401").send("unauthorised");
        };

    }catch(err){
        req.flash('error',`error in displaying profile page : ${err}`);
        return res.redirect("back");
    }

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

