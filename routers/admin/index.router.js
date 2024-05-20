const Dashboardroute=require("./dashboard.route")//-IMPORT ROUTER DASHBOARD
const Productroute=require("./products.route")//IMPORT ROUTER PRODUCTS
const CategoryRoute=require("./category.route")
const roles=require("./role.route")
const account=require("./account.route")
const auth=require("./auth.route")
const authMiddleware=require("../../middleware/admin/auth.middleware")

const systemconfig=require("../../config/system")//-IMPORT sử dụng chung FIXADMIN(URL:admin)


module.exports=(app)=>{
    const PATHAdmin=systemconfig.Prefixadmin;

    app.use(PATHAdmin + "/dashboard",authMiddleware.auth, Dashboardroute);//-admin/dashboard tìm đến router dashboard

    app.use(PATHAdmin+"/products",authMiddleware.auth, Productroute);//-admin/dashboard tìm đến router product

    app.use(PATHAdmin+"/category-product",authMiddleware.auth,CategoryRoute );

    app.use(PATHAdmin+"/roles",authMiddleware.auth,roles);

    app.use(PATHAdmin+"/account",authMiddleware.auth,account);
    
    app.use(PATHAdmin+"/auth",auth)
}