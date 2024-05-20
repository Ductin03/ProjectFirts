module.exports.validates=(req,res,next)=>{
    if(!req.body.title){
        req.flash('error', 'Vui lòng nhập tiêu đề lớn hơn 8 ký tự!');
        res.redirect("back");
        return;
    }
    next();
}