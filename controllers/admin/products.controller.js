const Product=require("../../models/product.model")
const category=require("../../models/category-product.model")
const FindProduct=require("../../helper/filterstatus")
const SearchProduct=require("../../helper/search")
const buttonPage=require("../../helper/buttonPage")
const systemConfig=require("../../config/system")
const Tree=require("../../helper/create-tree")
// [GET] /admin/products

module.exports.products=async (req, res) => {
    // console.log(req.query.status);
    const filterStatus=FindProduct(req.query);
    
    let find={
        deleted: false
    };

    if(req.query.status)
        find.status=req.query.status;

//Tìm kiếm sản phẩm
    const Search=SearchProduct(req.query);
    if(Search.regex){
        find.title=Search.regex;
    }

//phân trang
    const countProducts= await Product.countDocuments(find);//HÀM ĐẾM CÓ BAO NHIÊU DỮ LIỆU TRONG DATABASE
    //-GỌI HÀM TRUYỀN VÀO THAM SỐ
    const ObjectPage=buttonPage(
        {
        currentPage: 1,
        Litmits:9
        },
        req.query,
        countProducts
    )
    let sort={};
    if(req.query.sortKey&&req.query.sortValue){
        sort[req.query.sortKey]=req.query.sortValue;
    }else{
        sort.position="desc"

    }

    const products=await Product.find(find).sort(sort).limit(ObjectPage.Litmits).skip(ObjectPage.SkipPage);//LIMIT GIỚI HẠN DỮ LIỆU, SKIP BỎ QUA DỮ LIỆU
    // console.log(products)

    res.render("admin/pages/products/index",{
        titlePage: "Danh sách sản phẩm",
        productPage: products,
        FilterStatus: filterStatus,
        Keyword: Search.keyword,//-LẤY KEYWORD IN RA MÀN HÌNH
        panigation: ObjectPage//--XUẤT OBJECT RA ĐỂ LẤY TOTAL PAGE TẠO NÚT BẤM

    })
};


//[GET] /admin/products/change-status/id
module.exports.changeStatus=async (req, res)=>{
    const status=req.params.status

    const id=req.params.id;

    await Product.updateOne({_id: id},{status: status})//mở document của mongoose ĐỌC(--UPDATE 1 SẢN PHẨM (ID, KEY:VALUE NEW))
    req.flash('success', 'Cập nhật trạng thái sản phẩm thành công!');
    res.redirect("back") //mở queri của express (--QUAY VỀ TRANG MẶC ĐỊNH)
}


//ChanngeMulti
module.exports.changeMultiStatus=async (req,res)=>{

    const type=req.body.type;
    const ids=req.body.ids.split(", ");
    switch (type) {
        case "active":
            await Product.updateMany({_id: {$in:ids} },{status: "active"})   
            req.flash('success', 'Cập nhật trạng thái các sản phẩm thành công!');      
            break;

        case "inactive":
            await Product.updateMany({_id: {$in:ids} },{status: "inactive"})  
            req.flash('success', 'Cập nhật trạng thái các sản phẩm thành công!');
            break;

        case "delete-all":
            await Product.updateMany(
                {_id: {$in:ids}},
                {deleted:true,
                deletedAt: new Date()
                }); 
            req.flash('success', 'Xóa các sản phẩm thành công!');
            break;

        case "change-position":
            for (const item of ids) {
                let[id, position]=item.split("-");//tách mảng(ngăn cách vởi -)

                position=parseInt(position);

                await Product.updateOne({_id: id}, {position: position})
            }
            req.flash('success', 'Cập nhật vị trí sản phẩm thành công!');

        default:
            break;
    }
    res.redirect("back") 
}

//DETELE ITEM
module.exports.deleteItem=async (req,res)=>{
    const id=req.params.id;
    await Product.updateOne({_id: id},
        {deleted:true,
        deletedAt: new Date()
        });
    req.flash('success', 'Xóa 1 sản phẩm thành công!');
    res.redirect("back");
    
}
module.exports.CreateProducts=async (req,res)=>{
    let find={
        deleted: false
    };

    const Category=await category.find(find);
    const newCategory=Tree.createTree(Category);

    res.render("admin/pages/products/create",{
        titlePage: "Tạo mới sản phẩm",
        category:newCategory
    })

}

module.exports.PostCreateProducts=async (req,res)=>{
    req.body.price=parseInt(req.body.price)
    req.body.discountPercentage=parseInt(req.body.discountPercentage)
    req.body.stock=parseInt(req.body.stock)

    if(req.body.position==""){
        const count= await Product.countDocuments();
        req.body.position=count+1;
    }
    else{
        req.body.position=parseInt(req.body.position)
    }

    const product=new Product(req.body);
        
    await product.save();    
    res.redirect(`${systemConfig.Prefixadmin}/products`);
}

//Edit products
module.exports.EditProducts=async (req,res)=>{
    try {
        const find ={
            deleted: false,
            _id:req.params.id
        };
        const product=await Product.findOne(find)

        const Category=await category.find({
            deleted:false
        });

        const newCategory=Tree.createTree(Category);
        res.render("admin/pages/products/edit",{
            titlePage: "Chỉnh sửa sản phẩm",
            EditProduct: product,
            category:newCategory

        })
    } catch (error) {
        req.flash('error', 'Không tìm thấy sản phẩm!');
        res.redirect(`/admin/products`);
        
    }
}
module.exports.PostEditProducts=async (req,res)=>{
    req.body.price=parseInt(req.body.price)
    req.body.discountPercentage=parseInt(req.body.discountPercentage)
    req.body.stock=parseInt(req.body.stock)
    req.body.position=parseInt(req.body.position)

    try {
        await Product.updateOne({ _id: req.params.id}, req.body)
        req.flash("success","Cập nhật sản phẩm thành công")
    } catch (error) {
        req.flash("error","Cập nhật sản phẩm thành công")
        
    }
    res.redirect("back")
}

//Detail Product
module.exports.Detail=async(req,res)=>{
    try {
        const find={
            deleted: false,
            _id: req.params.id
        };
        const product = await Product.findOne(find);

        res.render("admin/pages/products/detail",{
            titlePage: product.title,
            product: product
        })
        
    } catch (error) {
        req.flash("error","Không tìm thấy sản phẩm!")
        res.redirect("/admin/products")   
    }
}