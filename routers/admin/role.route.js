const express=require('express');
const controller=require("../../controllers/admin/role.controller")
const route=express.Router();

route.get('/', controller.index)
route.get('/create', controller.create)
route.post('/create', controller.createPost)
route.get('/edit/:id', controller.Edit)
route.patch('/edit/:id', controller.EditPatch)
route.delete('/delete/:id', controller.deteleRoles)
route.get('/permission', controller.Permissions)
route.patch('/permission', controller.permissionsPatch)


module.exports=route;