const account=require("../../models/account.model")
const systemConfig=require("../../config/system")

var md5 = require('md5');
module.exports.login=(req,res)=>{
    res.render("admin/pages/auth/login",{
        titlePage: "Trang đăng nhập"
    });
}
module.exports.loginPost=async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    const login=await account.findOne({
        email:email,
        deleted:false
    })
    if(!login){
        req.flash("error","Email không tồn tại")
        res.redirect("back");
        return;
    }
    if(md5(password)!=login.password){
        req.flash("error","Sai mật khẩu !")
        res.redirect("back");
        return;
    }
    if(login.status=="inactive"){
        req.flash("error","Tài khoản đã bị khóa !")
        res.redirect("back");
        return;
    }
    res.cookie("token", login.token)
    res.redirect(`${systemConfig.Prefixadmin}/dashboard`)

}
module.exports.logout=(req,res)=>{
    res.clearCookie("token");
    res.redirect(`${systemConfig.Prefixadmin}/auth/login`)
}