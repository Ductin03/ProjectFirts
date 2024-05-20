//Tìm theo trạng thái
const ButtonStatus=document.querySelectorAll("[button-status]")
    // console.log(ButtonStatus);
if(ButtonStatus.length>0){
    let url=new URL(window.location.href);//-tạo ra hàm url quản lý params

    //-LẶP QUA TỪNG NÚT BẤM BẮT SỰ KIỆN
    ButtonStatus.forEach(button=>{
       button.addEventListener("click",()=>{
        const status=button.getAttribute("button-status");

        if(status){
            url.searchParams.set("status",status)//-SET LÊN URL 
        }
        else{
            url.searchParams.delete("status")//-SET LÊN URL 
        }
        window.location.href=url.href;//-CHUYỂN HƯỚNG QUA TRANG MỚI
       })
    })
}

//Form Search
const formsearch=document.querySelector("#form-search");
if(formsearch){
    let url=new URL(window.location.href);
    //-SỰ KIỆN SUBMIT ĐƯA DỮ LIỆU NGƯỜI DÙNG NHẬP VÀO TÌM KIẾM LÊN SEVER
    formsearch.addEventListener("submit",(event)=>{
        event.preventDefault();//ngăn chặn sự kiện mặc định, ko load lại trang

        const keyword=event.target.elements.keyword.value;//-TẠO BIẾN KEYWORD LẤY RA GIÁ TRỊ NGƯỜI DÙNG NHẬP VÀO

        // console.log(keyword);
        if(keyword){
            url.searchParams.set("keyword", keyword);//-SET LÊN URL
        } else{
            url.searchParams.delete("keyword");
        }
        window.location.href=url.href;
    });
}
//Phân Trang
const ButtonPage=document.querySelectorAll("[button-page]")
if(ButtonPage){
    ButtonPage.forEach(button => {
        button.addEventListener("click",()=>{

            let url=new URL(window.location.href);

            const Page=button.getAttribute("button-page");
            
            if(Page){
                url.searchParams.set("page", Page);
                window.location.href=url.href;
                
            }
        })

    })
    
}

//CHECKBOX MULTI
    const checkboxMulti=document.querySelector("[checkbox-multi]")
        if(checkboxMulti){
            const checkAll=checkboxMulti.querySelector("input[name='checkall']")
            const checkId=checkboxMulti.querySelectorAll("input[name='id']")
            checkAll.addEventListener("click",()=>{
                if(checkAll.checked==true){
                    checkId.forEach(button=>{
                        button.checked=true;
                    })
                }
                else{
                    checkId.forEach(button=>{
                        button.checked=false;
                    })
                }
            })

            checkId.forEach(button=>{
                button.addEventListener("click",()=>{
                    const countCheck=checkboxMulti.querySelectorAll("input[name='id']:checked").length;
                    if(countCheck==checkId.length){
                            checkAll.checked=true;
                    }
                    else{
                            checkAll.checked=false;
                    }
                })
            })
        }
      

//Change Multi
    const formChangeMulti=document.querySelector("[form-change-multi]")
    if(formChangeMulti){
        formChangeMulti.addEventListener("submit",(e)=>{
            e.preventDefault();
            const checkboxMulti=document.querySelector("[checkbox-multi]")

            const inputsChecked=checkboxMulti.querySelectorAll("input[name=id]:checked");

            const typeChange=e.target.elements.type.value;

            
            if(typeChange=="delete-all"){

            const isConfirm=confirm("Bạn có chắc chắn xóa những sản phẩm này ? ");
            
            if(!isConfirm){
                return;
                }
            }

            if(inputsChecked.length>0){
                let ids=[];
                const inputIds=formChangeMulti.querySelector("input[name='ids']")
                inputsChecked.forEach(input=>{
                    const id=input.value;
                    if(typeChange == "change-position"){

                        const position=input.closest("tr").querySelector("input[name='position']").value;

                        ids.push(`${id}-${position}`);

                    }else{
                        ids.push(id);   
                    }
                })
                inputIds.value=ids.join(", ") 
                formChangeMulti.submit();

            }else{
                alert("Chon it nhat 1 ban ghi")
            }
        })
    }

//Show alert
    const showAlert=document.querySelector("[Show-alert]")
    if(showAlert){  
    const time=parseInt(showAlert.getAttribute("data-time"));
    const CloseAlert=document.querySelector("[close-alert]")
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden")
    },time)
    CloseAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden")
    })
}
    
//Upload Image preview
const UploadImage=document.querySelector("[upload-image]")
    if(UploadImage){
        const UploadImageInput=UploadImage.querySelector("[upload-image-input")
        const UploadImagePreview=UploadImage.querySelector("[upload-image-preview")
        UploadImageInput.addEventListener("change",(e)=>{
            console.log(e)
            const file=e.target.files[0]
            if(file){
                UploadImagePreview.src=URL.createObjectURL(file)
            }
        })
    }
//Sort
const sort=document.querySelector("[sort]")
if(sort){
    let url=new URL(window.location.href);

    const sortSelect=sort.querySelector("[sort-select]")
    const sortClear=sort.querySelector("[sort-clear]")

        sortSelect.addEventListener("change",(e)=>{
            const value=e.target.value
            const [sortKey,sortValue]=value.split("-");
            url.searchParams.set("sortKey", sortKey);//-SET LÊN URL
            url.searchParams.set("sortValue", sortValue); 
        window.location.href=url.href;
        })

//Xóa
        sortClear.addEventListener("click",()=>{

            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue");

            window.location.href=url.href;
        });
//default    
    const sortKey= url.searchParams.get("sortKey");
    const sortValue= url.searchParams.get("sortValue");
    if(sortKey&&sortValue){
        const stringSort=`${sortKey}-${sortValue}`
        const Optionselect=sortSelect.querySelector(`option[value='${stringSort}']`);
        Optionselect.selected=true
    }
}

