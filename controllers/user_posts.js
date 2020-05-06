module.exports.post = function(req, res){
    return res.render("posting_page", {title: "User's posts", user: "Shivani"});
}

module.exports.posting = function(req, res){
    console.log("posting");
    return res.end(`<h1>Routing action for user's post</h1>`);
}