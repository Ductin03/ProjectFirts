const express=require("express")
const router= express.Router();
const controller=require("../../controllers/admin/Account.controller.js")
const Cloud=require("../../middleware/admin/uploadCloud.middleware")
const validate=require("../../validates/admin/account.validates")
//TẢI PACKAGE MULTER ĐỂ LOAD ẢNH
const multer  = require('multer')//UPLOAD ẢNH

// import lưu trữ lên cloud

const cloudinary=require("cloudinary").v2;
const streamifier=require("streamifier");

const upload = multer()

router.get("/",controller.Account);
router.get("/create",controller.createAccount);
router.post("/create",upload.single('avatar'),Cloud.uploadCloud,validate.createPost,controller.createAccountPost);
router.get("/edit/:id",controller.editAccount);
router.patch("/edit/:id",upload.single('avatar'),Cloud.uploadCloud,validate.editPatch,controller.editAccountPatch);
module.exports=router;