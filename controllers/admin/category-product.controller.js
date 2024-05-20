const category=require("../../models/category-product.model")
const systemConfig=require("../../config/system")
const FindProduct=require("../../helper/filterstatus")
const SearchProduct=require("../../helper/search")
const buttonPage=require("../../helper/buttonPage")
const Tree=require("../../helper/create-tree")

module.exports.category=async (req,res) =>{
    const filterStatus=FindProduct(req.query);
    let find={
        deleted: false
    };
    if(req.query.status){
        find.status=req.query.status
    }
    const search=SearchProduct(req.query);
    if(search.regex){
        find.title=search.regex;
    }
    const countProducts= await category.countDocuments(find);//HÀM ĐẾM CÓ BAO NHIÊU DỮ LIỆU TRONG DATABASE
    //-GỌI HÀM TRUYỀN VÀO THAM SỐ
    const ObjectPage=buttonPage(
        {
        currentPage: 1,
        Litmits:2
        },
        req.query,
        countProducts
    )

    const records=await category.find(find).limit(ObjectPage.Litmits).skip(ObjectPage.SkipPage);

    const newRecords=Tree.createTree(records);

    res.render("admin/pages/category/index",{
        titlePage: "Danh mục sản phẩm",
        records: newRecords,
        FilterStatus: filterStatus,
        Keyword: search.keyword,
        panigation: ObjectPage

    })
}
module.exports.create=async (req,res)=>{
    let find={
        deleted: false
    };

    const records=await category.find(find);
    const newRecords=Tree.createTree(records);
    
    res.render("admin/pages/category/create",{
        titlePage: "Danh mục sản phẩm",
        records: newRecords
    })
}
module.exports.Postcreate=async(req,res)=>{
    try {
        if(req.body.position==""){
            const count= await category.countDocuments();
            req.body.position=
            +1;
        }else{
            req.body.position=parseInt(req.body.position)
        }
        const categoryProducts=new category(req.body);
        
        await categoryProducts.save();
    
        res.redirect(`${systemConfig.Prefixadmin}/category-product`)
    } catch (error) {
        res.redirect(`${systemConfig.Prefixadmin}/category-product`)
    }
}



module.exports.edit=async(req,res)=>{
    try {
        const find={
            deleted: false,
            _id:req.params.id
        };  
        const Category=await category.findOne(find); 

        const records=await category.find({
            deleted: false
        });

        const newRecords=Tree.createTree(records);


        res.render("admin/pages/category/edit",{
            titlePage: "Chỉnh sửa sản phẩm ",
            EditCategory: Category,
            records: newRecords
            
        })
    } catch (error) {
        res.redirect(`${systemConfig.Prefixadmin}/category-product`)
    }
}
module.exports.PostEdit=async(req,res)=>{
    const id=req.params.id;

    req.body.position=parseInt(req.body.position);

    await category.updateOne({ _id:id }, req.body);

    res.redirect("back");
}