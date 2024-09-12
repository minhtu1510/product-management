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
