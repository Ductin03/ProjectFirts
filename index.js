const express = require('express')//require để import các package, code bên là để import package express 
var path = require('path');

const bodyParser = require('body-parser')//IMPORT BODYPARSE để lấy dữ liệu


//-Để hiện thông báo
const flash  = require ('express-flash') 
const cookieParser=require('cookie-parser')
const session=require('express-session')

//khai báo để sử dụng method patch...., method-override(1)
const methodOverride = require('method-override')

//IMPORT ENV VÀO ĐỂ DÙNG
require("dotenv").config();

const Systemconfig = require("./config/system")

//KẾT DATABASE
const MongoDB = require("./config/database");

MongoDB.connectApi();

//ROUTER client
const route = require("./routers/client/index.route")

//ROUTER admin
const routeadmin = require("./routers/admin/index.router")

//gọi hàm tạo 1 app app=express(), biến app là toàn bộ chương trình, đối tượng cấp cao nhất
const app = express()

//TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//TẠO HÀM PORT GÁN BẰNG CỔNG PORT BÊN ENV
const port = process.env.PORT;

// parse application/x-www-form-urlencoded: sử dụng body parser
app.use(bodyParser.urlencoded({ extended: false }))

//methodOverride(PATCH,PUT,GET,POST....)(2)

app.use(methodOverride('_method'))

//App locals Variable tạo ra biến toàn cục, file pug nào cũng sẽ sử dụng được(url(ADMIN)) chỉ sử dụng cho pug

app.locals.fixadmin = Systemconfig.Prefixadmin;

//muốn dùng pug phải có 2 dòng này
app.set('views', './views');
app.set('view engine', 'pug');

//Thông báo
app.use(cookieParser('tinnn'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//khai báo sử dụng folder public
app.use(express.static('public'));

route(app);

routeadmin(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
