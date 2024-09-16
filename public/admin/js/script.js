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
