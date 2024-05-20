const mongoose=require("mongoose");

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const categorySchema=new mongoose.Schema({
   title: String,
   parent_id: {
        default:"",
        type: String,
   },
   slug: { 
      type: String,
      slug: "title",
      unique: true
   },
   description: String,
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

const Productcategory = mongoose.model('category-products', categorySchema, "products-category");

module.exports=Productcategory;//XUẤT PRODUCT QUA CONTROLLER PRODUCT DÙNG
