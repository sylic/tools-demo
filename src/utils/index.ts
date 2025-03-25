// 将Fild对象读成文件流
export const  fileReader = (file:File) => {
  return new Promise((resolve) => {
    let URL = window.URL || window.webkitURL;
    console.log(file);
    let imgURL =URL.createObjectURL(file);
    resolve(imgURL);
	})
}

// 销毁URL链接
export const revokeUrl = (url: string) => {
  if (!url) return;
  let URL = window.URL || window.webkitURL;
  URL.revokeObjectURL(url);
}