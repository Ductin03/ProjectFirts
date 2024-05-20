const accountModel=require("../../models/account.model.js");
const Roles=require("../../models/roles.model.js");
const systemConfig=require("../../config/system")

var md5 = require('md5');

module.exports.Account=async(req,res)=>{
    let find={
        deleted: false
    };
    const record=await accountModel.find(find).select
    ("-password -token");

    for (const item of record) {
        const role= await Roles.findOne({
            _id:item.roleId,
            deleted: false
        })
        item.roles=role
        
    }
    res.render("admin/pages/account/index",{
        titlePage: "Danh sách tài khoản",
        record:record
    })

}
module.exports.createAccount=async(req,res)=>{
        const roles= await Roles.find({
            deleted: false
        })
        res.render("admin/pages/account/create",{
            titlePage: "Thêm tài khoản",
            roles: roles
        })
}
module.exports.createAccountPost=async(req,res)=>{

    const emailExist= await accountModel.findOne({
        email: req.body.email,
        deleted: false
    })

    if(emailExist){

        req.flash("error", `Email ${req.body.email} đã tồn tại`);
        res.redirect("back");
    }else{
        req.body.password=md5(req.body.password) 
        const account= new accountModel(req.body)
        await account.save();
        res.redirect("back");

    }
}
module.exports.editAccount=async (req,res)=>{
    try {
        const account= await accountModel.findOne({
            _id:req.params.id,
            deleted:false
        })
            const role=await Roles.find({
                deleted: false
            })
    
        res.render("admin/pages/account/edit",{
            titlePage:"Sửa User",
            account:account,
            role:role
        })
        
    } catch (error) {
        req.flash("error","Không tìm thấy tài khoản !")
        res.redirect(`${systemConfig.Prefixadmin}/account`);
    }
}
    module.exports.editAccountPatch=async (req,res)=>{
        const id=req.params.id;
        const emailExist= await accountModel.findOne({
            _id: { $ne: id},
            email: req.body.email,
            deleted: false
        })
    
        if(emailExist){
    
            req.flash("error", `Email ${req.body.email} đã tồn tại`);
            res.redirect("back")
        }
        else{
            if(req.body.password){
                req.body.password=md5(req.body.password)     
                } else {
                    delete req.body.password              
                    }    
                await accountModel.updateOne({_id:id},req.body)
                req.flash("success","Cập nhật thành công")
                res.redirect("back")  
            } 

        }
