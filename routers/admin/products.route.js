const express = require('express');
const Cloud=require("../../middleware/admin/uploadCloud.middleware")

//TẢI PACKAGE MULTER ĐỂ LOAD ẢNH
const multer  = require('multer')//UPLOAD ẢNH

// import lưu trữ lên cloud

const cloudinary=require("cloudinary").v2;
const streamifier=require("streamifier");


const controller=require("../../controllers/admin/products.controller")
const validate=require("../../validates/admin/produc.validates")//check điều kiện dữ liệu

// const storagemulter=require("../../helper/strorageMulter")//import file bên helper Lấy đuôi file (png,svg...)


const upload = multer() 


const route=express.Router();   //-TẠO RA 1 ROUTER ĐỂ SỬ DỤNG

    //router sản phẩm
    route.get('/', controller.products);//-controller .đến products xuất ra bên file product.controller
    //router changestatus
    route.patch("/change-status/:status/:id", controller.changeStatus);//  -controller .đến changestatus xuất ra bên file product.controller
    route.patch("/changemulti-status", controller.changeMultiStatus);
    route.delete("/delete/:id", controller.deleteItem);
    route.get('/create', controller.CreateProducts);
    route.post('/create', upload.single('thumbnail'),Cloud.uploadCloud, validate.validates, controller.PostCreateProducts);

    route.get('/edit/:id', controller.EditProducts,validate.validates);
    route.patch('/edit/:id', upload.single('thumbnail'),Cloud.uploadCloud, validate.validates, controller.PostEditProducts);

    route.get('/detail/:id', controller.Detail)


    
module.exports=route;//xuất ra router qua index.router sử dụng