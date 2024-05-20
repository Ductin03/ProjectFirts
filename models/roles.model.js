const mongoose=require("mongoose");
const roleSchemal=new mongoose.Schema({
    title: String,
    permissions:{
        type: Array,
        default:[]
    },
    description: String,
    deleted: {
       type:Boolean,
       default:false
    },
    deletedAt: Date
 },{
    timestamps: true
})
const Roles = mongoose.model('roles', roleSchemal, "roles");

module.exports=Roles;