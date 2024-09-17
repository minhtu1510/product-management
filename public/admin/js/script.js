//Bộ lọc
const boxFilter = document.querySelector("[box-filter]");
if (boxFilter) {
  let url = new URL(location.href); //nhân bản url

  boxFilter.addEventListener("change", () => {
    const value = boxFilter.value;
    if (value) {
      url.searchParams.set("status", value);
    } else {
      url.searchParams.delete("status");
    }

    location.href = url.href;
  });
  //Hiển thị lựa chọn mặc định
  const statusCurrent = url.searchParams.get("status");
  console.log(statusCurrent);
  if (statusCurrent) {
    boxFilter.value = statusCurrent;
  }
}

//Hết bộ lọc

//Tìm kiếm
const formsearch = document.querySelector("[form-search]")
if(formsearch){
  let url = new URL(location.href)
  formsearch.addEventListener("submit",(event) => {
    event.preventDefault();//Ngăn chặn hành vi mặc định :submit form
    const value = formsearch.keyword.value;
    if(value){
      url.searchParams.set("keyword",value)
    }
    else{
      url.searchParams.delete("keyword")
    }
    location.href = url.href
  })
}
//Hết tìm kiếm

//Phân trang
const listButtonPagination = document.querySelectorAll("[button-pagination]")
if(listButtonPagination.length>0){
  let url = new URL(location.href)
  listButtonPagination.forEach(button => {
    
    button.addEventListener("click",() => {
      const page = button.getAttribute("button-pagination");
      console.log(page)

      if(page){
        url.searchParams.set("page",page)
      }
      else{
        url.searchParams.delete("page")
      }

      location.href = url.href;
      })
  })
  //Hiển thị trang mặc đinh
  const pageCurrent = url.searchParams.get("page") || 1 
  const buttonCurrent = document.querySelector(`[button-pagination="${pageCurrent}"]`)
  console.log(buttonCurrent)
  if(buttonCurrent){
    buttonCurrent.parentNode.classList.add("active")
  }

}
//Hết phân trang

//Đổi trạng thái
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]")
if(listButtonChangeStatus.length > 0){
  listButtonChangeStatus.forEach(button => {
    button.addEventListener("click",() => {
      const itemId = button.getAttribute("item-id");
      const statusChange  = button.getAttribute("button-change-status")
      const path = button.getAttribute("data-path")

      const data = {
        id:itemId,
        status:statusChange
      };

      fetch(path,{
        headers:{
          "Content-Type": "application/json"
        },
        method:"PATCH",
        body: JSON.stringify(data)

      })
        .then(res => res.json())
        .then(data =>{
          if(data.code == "success"){
            location.reload()
          }
        })
      
    })
  })
}
//Hết đổi trạng thái

// Đổi trạng thái cho nhiều bản ghi
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
  formChangeMulti.addEventListener("submit",(event) => {
    event.preventDefault();
    const path =formChangeMulti.getAttribute("data-path")
    const status = formChangeMulti.status.value;
    const ids = []
    const listInputChangeChecked = document.querySelectorAll("[input-change]:checked")
    listInputChangeChecked.forEach(input => {
      const id = input.getAttribute("input-change")
      ids.push(id)
    })
    const data = {
      ids:ids,
      status:status

  }
  fetch(path,{
    headers:{
      "Content-Type": "application/json"
    },
    method:"PATCH",
    body: JSON.stringify(data)

  })
    .then(res => res.json())
    .then(data =>{
      if(data.code == "success"){
        location.reload()
      }
    })
}
  )
}
// Hết Đổi trạng thái cho nhiều bản ghi

//Xóa vĩnh viễn sản phẩm
const listButtonDelete = document.querySelectorAll("[button-delete]")
if(listButtonDelete.length>0){
  listButtonDelete.forEach(button => {
    button.addEventListener("click",()=> {
      const isConfirm =confirm("Bạn có chắc muốn xóa bản ghi này?")
      if(isConfirm){
        const id=button.getAttribute("item-id")
        const path = button.getAttribute("data-path")
  
        const data={
          id:id
        }
  
        fetch(path,{
          headers:{
            "Content-Type": "application/json"
          },
          method:"DELETE",
          body: JSON.stringify(data)
      
        })
          .then(res => res.json())
          .then(data =>{
            if(data.code == "success"){
              location.reload()
            }
          })

      }   
     
    })

  })
}

//Hết Xóa vĩnh viễn sản phẩm
