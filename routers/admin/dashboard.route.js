const express = require('express');
const pagehome=require("../../controllers/admin/dashboard.controller")
const route=express.Router();

 route.get('/', pagehome.dashboard);

module.exports=route;