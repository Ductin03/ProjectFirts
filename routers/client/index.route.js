const homeroute=require("./home.route")
const router=require("./products.route")

module.exports=(app)=>{
    app.use('/', homeroute)
    
    app.use('/products', router);

}