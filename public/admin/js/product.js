//-CHANGE STATUS
const buttonChangeStatus=document.querySelectorAll("[button-change-status]")//lấy ra cái nút bấm

    if(buttonChangeStatus.length>0){

        const formchangeStatus=document.querySelector("#form-change-status");//lấy id form

        const Path=formchangeStatus.getAttribute("data-path")//TẠO RA PATCH GÁN BẰNG VALUE DATAPATCH(ADMIN/PRODUCTS/CHANGESTATUS)

        buttonChangeStatus.forEach(button=>{
            button.addEventListener("click",()=>{

                const statusCurrent=button.getAttribute("data-status")//-LẤY RA STATUS HIỆN TẠI

                const id=button.getAttribute("data-id")//LẤY RA ID

                let statusChange = statusCurrent=="active"?"inactive":"active";//CHANGE STATUS

                const action=Path+`/${statusChange}/${id}?_method=PATCH`//-DÙNG PATH ĐỂ NỐI DỮ LIỆU VỚI STATUSCHANGE VÀ ID
                
                formchangeStatus.action=action;//CHO ACTION CỦA FORM BẰNG ACTION MÌNH TẠO RA
                
                formchangeStatus.submit();//KHÔNG DÙNG NÚT BẤM NÊN GỌI HÀM SUBMIT ĐƯA DỮ LIỆU LÊN SEVER
            })
        })
    }

//end Change Status


//Remove products
const buttonsdelete=document.querySelectorAll("[button-delete]")
    if(buttonsdelete.length>0){
        buttonsdelete.forEach(button=>{
            const formDelete=document.querySelector("#form-delete-item")
            const path=formDelete.getAttribute("data-path")
            button.addEventListener("click",()=>{
                const comfirm=confirm("Bạn chắc chắn muốn xóa sản phẩm ?")
                if(comfirm){
                const id=button.getAttribute("remove-id")
                const action=`${path}/${id}?_method=DELETE`  
                formDelete.action=action;
                formDelete.submit();
                }

            });
        });
    }

