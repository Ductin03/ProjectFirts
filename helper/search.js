module.exports=(query)=>{
    let objectSearch={
        keyword:""
    }

    if(query.keyword){
        objectSearch.keyword=query.keyword;//-LẤY KEYWORD IN RA MÀN HÌNH 

        const regex=new RegExp(objectSearch.keyword,"i");//-TÌM THEO REGEX, i KHÔNG PHÂN BIỆT HOA THƯỜNG

        objectSearch.regex=regex;//LẤY REGEX THÊM VÀO OBJECT ĐỂ TRUY VẤN DỮ LIỆU
    }
    return objectSearch;
}