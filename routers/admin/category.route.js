const express = require('express');
const controller=require("../../controllers/admin/category-product.controller")
const Cloud=require("../../middleware/admin/uploadCloud.middleware")

const multer  = require('multer')//UPLOAD ẢNH

const cloudinary=require("cloudinary").v2;
const streamifier=require("streamifier");

const validate=require("../../validates/admin/product-category.validates")//check điều kiện dữ liệu

const upload = multer() 

const route=express.Router(); 

    route.get('/',controller.category)
    route.get('/create',controller.create)

    route.post('/create', upload.single('thumbnail'),Cloud.uploadCloud, validate.validates, controller.Postcreate);
    route.get('/edit/:id', controller.edit)
    route.patch('/edit/:id',upload.single('thumbnail'),Cloud.uploadCloud, validate.validates, controller.PostEdit)


module.exports=route;
