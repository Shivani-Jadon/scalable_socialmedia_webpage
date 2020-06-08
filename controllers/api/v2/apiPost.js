module.exports.data_post = function(req,res){

    return res.json(200, {
        message : "API for post data in version 2",
        post : []
    })
}