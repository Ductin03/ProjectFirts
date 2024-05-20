const rolesModel=require("../../models/roles.model");
const systemConfig=require("../../config/system")
module.exports.index=async(req,res)=>{
    const find={
        deleted:false
    }
    const records=await rolesModel.find(find);
    res.render("admin/pages/roles/index",{
        titlePage:"Nhóm Quyền",
        record:records
    });
}
module.exports.create=(req,res)=>{
    res.render("admin/pages/roles/create",{
        titlePage:"Thêm Nhóm Quyền"
    });
}
module.exports.createPost=async (req,res)=>{
    const roles=new rolesModel(req.body);
    await roles.save();
    res.redirect(`${systemConfig.Prefixadmin}/roles`);
}

module.exports.Edit=async(req,res)=>{
    try {
        const find ={
            deleted: false,
            _id:req.params.id
        };
        const record=await rolesModel.findOne(find);
        res.render("admin/pages/roles/Edit",{
            titlePage:"Sửa Nhóm Quyền",
            record: record
        });
    } catch (error) {
        req.flash("error","Không tìm thấy");
        res.redirect(`${systemConfig.Prefixadmin}/roles`)
    }
 
}
module.exports.EditPatch=async(req,res)=>{
    try {
        const id=req.params.id;
        const EditRoles=await rolesModel.updateOne({_id:id},req.body)
        req.flash("success","Cập nhật thành công! ")
    } catch (error) {
        req.flash("error","Cập nhật không thành công! ")
    }

    res.redirect(`${systemConfig.Prefixadmin}/roles`)
}

module.exports.deteleRoles=async(req,res)=>{    
    const id=req.params.id;
    await rolesModel.updateOne({_id:id},{
        deleted:true,
        deletedAt: new Date()
    })
    res.redirect("back");
}
module.exports.Permissions=async (req,res)=>{
    let find={
        deleted:false
    };
    const record=await rolesModel.find(find);
    res.render("admin/pages/roles/permissions",{
        titlePage:"Phân Quyền",
        record:record
    })
}
module.exports.permissionsPatch=async(req,res)=>{
    const permission=JSON.parse(req.body.permissions)
    for (const item of permission) {
        await rolesModel.updateOne({_id:item.id},{permissions:item.permissions})
    }
    res.redirect("back")

}