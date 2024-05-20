const express = require('express');
const pagehome=require("../../controllers/client/home.controller")
const route=express.Router();

 route.get('/', pagehome.home);

module.exports=route;