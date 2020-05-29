// send response of flash messages stored in session cookies
module.exports.flash_session = function(req, res, next){

    res.locals.flash = {
        success : req.flash('success'),
        error : req.flash('error')
    }

    next();
}