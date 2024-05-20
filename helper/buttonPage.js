module.exports=(ObjectPage,query,countProducts)=>{
    if(query.page){
    ObjectPage.currentPage=parseInt(query.page);//THÊM PAGE HIỆN TẠI VÀO OBJECT

    ObjectPage.SkipPage=(ObjectPage.currentPage-1)*ObjectPage.Litmits;//-TÍNH TOÁN BỎ QUA BAO NHIÊU DỮ LIỆU(THÊM VÀO OBJECT)
    }

    const totalPage=Math.ceil(countProducts/ObjectPage.Litmits);

    ObjectPage.totalPage=totalPage;//- TÌM TOTALPAGE ĐỂ TẠO RA CÁC NÚT BẤM CHO PHÙ HỢP

    return ObjectPage;
}