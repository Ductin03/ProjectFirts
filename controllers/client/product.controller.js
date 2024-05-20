const Product=require("../../models/product.model")

module.exports.product= async (req, res) => {   
    const products= await Product.find({
        status: "active",
        deleted: "false"
    }).sort({position:"desc"})
    // products.forEach(item => {
    //     item.Newprice=(item.price*(100-item.
    //     discountPercentage)/100).toFixed(0);
    // })
    const NewPrice=products.map(item => {
        item.priceNew=(item.price*(100-item.
        discountPercentage)/100).toFixed(0);
        return item;
    })
    // console.log(products);

    res.render("client/pages/products/index",{
        titlePage: "Trang Sản Phẩm",
        Pageproduct: NewPrice
    })      
};

module.exports.detail=async(req,res)=>{
    try {
        const find={
            deleted: false,
            slug:req.params.slug,
            status: "active"
        }
        const product= await Product.findOne(find);
        res.render("client/pages/products/detail",{
            titlePage:product.title,
            product: product

        })
    } catch (error) {
        res.redirect(`/product`)

        
    }

};