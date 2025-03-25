// 将Fild对象读成文件流
export const  fileReader = (file:any) => {
  return new Promise((resolve) => {
    let URL = window.URL || window.webkitURL;
    let fileTemp = file.raw? file.raw : file;
    let imgURL =URL.createObjectURL(fileTemp);
    resolve(imgURL);
	})
}

// 销毁URL链接
export const revokeUrl = (url: string) => {
  if (!url) return;
  let URL = window.URL || window.webkitURL;
  URL.revokeObjectURL(url);
}