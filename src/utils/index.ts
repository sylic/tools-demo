// 将Fild对象读成文件流
export const  fileReader = (file:any) => {
  return new Promise((resolve, reject) => {
    let URL = window.URL || window.webkitURL;
    let imgURL = URL.createObjectURL(file.raw);
    resolve(imgURL);

    // 生成的是img图片
    // const img = new Image()
    // const reader = new FileReader()
    // reader.onload = function (e) {
    //   img.src = e.target!.result as string
    // }
    // reader.onerror = function (e) {
    //   reject(e)
    // }
    // reader.readAsDataURL(file.raw)
    // img.onload = function () {
    //   resolve(img)
    // }
    // img.onerror = function (e) {
    //   reject(e)
    // }
	})
}

// 销毁URL链接
export const revokeUrl = (url: string) => {
  if (!url) return;
  let URL = window.URL || window.webkitURL;
  URL.revokeObjectURL(url);
}