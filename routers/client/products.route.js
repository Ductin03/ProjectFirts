const express = require('express');
const pageProduct= require("../../controllers/client/product.controller")

const route=express.Router();

 route.get('/', pageProduct.product)
 route.get('/:slug', pageProduct.detail)

module.exports=route; //xuất cái route ra để dùng   