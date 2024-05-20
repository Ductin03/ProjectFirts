const mongoose=require("mongoose");
//-SỬ DỤNG SCHEMA CỦA MOONGSE XÂY DỰNG MODEL LẤY DỮ LIỆU

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
//Cài thêm thư viện mongoose-slug-updater để có slug

const ProductSchema=new mongoose.Schema({
   title: String,
   parent_product_id: {
      type: String,
      default:""
   },
   slug: { 
      type: String,
      slug: "title",
      unique: true
   },
   description: String,
   price: Number,
   discountPercentage: Number,
   stock: Number,
   thumbnail: String,
   status: String,
   position: Number,
   deleted: {
      type:Boolean,
      default:false
   },
   deletedAt: Date
},{
   timestamps: true
});

const Product = mongoose.model('Product', ProductSchema, "products");//[1] ID, [2]MODEL,[3] TÌM ĐẾN COLLECTIONS
module.exports=Product;//XUẤT PRODUCT QUA CONTROLLER PRODUCT DÙNG
