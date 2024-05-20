const systemConfig=require("../../config/system")
const accountModel=require("../../models/account.model.js");
module.exports.auth=async(req , res, next)=>{
    if(!req.cookies.token){
        res.redirect(`${systemConfig.Prefixadmin}/auth/login`)
    }   else{
        const user=await accountModel.findOne({token: req.cookies.token})
        if(!user){
            res.clearCookie("token");
            res.redirect(`${systemConfig.Prefixadmin}/auth/login`)
        }else{
            next();
        }
    }
}