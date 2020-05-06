//display posting_page view when post is exported
module.exports.post = function(req, res){
    return res.render("posting_page", {title: "User's posts", user: "Shivani"});
}

//display this when posting is exported
module.exports.posting = function(req, res){
    console.log("posting");
    return res.end(`<h1>Routing action for user's post</h1>`);
}