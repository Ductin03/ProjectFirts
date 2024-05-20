const buttonDelete=document.querySelectorAll("[button-delete]")
    if(buttonDelete.length>0){
        buttonDelete.forEach(button=>{
            const formDelete=document.querySelector("#form-delete-roles")
            const path=formDelete.getAttribute("data-path")
            button.addEventListener("click",()=>{
                const comfirm=confirm("Bạn chắc chắn muốn xóa sản phẩm ?")
                    if(comfirm){
                        const id=button.getAttribute("remove-id");
                        const action=`${path}/${id}?_method=DELETE`;
                        formDelete.action=action;
                        formDelete.submit();
                    }
            })
        })
    }
