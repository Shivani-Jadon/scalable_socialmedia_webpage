module.exports.home = function(req, res){
    res.send("<h1>Loading home page on express</h1>");
}

module.exports.home2 = function(req, res){
    res.send("<h1>Loading home page on express through controller</h1>");
}