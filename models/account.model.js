const mongoose=require("mongoose");
const generate= require("../helper/generate")
const accountSchema= new mongoose.Schema(
    {
    fullname: String,
    email: String,
    password: String,
    token: {
        default: generate.generateRandomString(20),
        type: String
    },
    phone: String,
    avatar: String, 
    roleId: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date,
    },
    {
        timestamps:true
    }

)
    const Account=mongoose.model("account", accountSchema,
        "account")
    module.exports=Account;
