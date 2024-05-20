const express=require("express")
const router=express.Router();
const loginValidates=require("../../validates/admin/login.validates")
const controller=require("../../controllers/admin/auth.controller")
    router.get("/login",controller.login);
    router.post("/login",loginValidates.login,controller.loginPost);
    router.get("/logout",controller.logout)

module.exports=router;