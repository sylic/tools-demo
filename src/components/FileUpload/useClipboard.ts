import { ElMessage } from 'element-plus'
export const useClipBoard = async ():Promise<any> => {
  try {
    const clipboard = await navigator.clipboard.read();
    for (const clipboardItem of clipboard) {
      if (clipboardItem.types.length == 0) {
        messageFun('剪贴板内没有内容！', 'warning');
        return Promise.reject(null); 
       }
       for (const type of clipboardItem.types) {
         let fileType = type.split('/')[1]; // 文件类型
         // 判读文件类型是否满足
         if (!handleClipContent(fileType)) {
           messageFun('剪贴板中的文件类型不是png、jpg、jpeg格式，请重新复制~', 'error');
           return Promise.reject(null);
         }
         const fileName = `${Date.now()}.${fileType}`;// 文件名
          const blob = await clipboardItem.getType(type);
          const file = new File([blob], fileName, {
            type: blob.type
          });
         return Promise.resolve(file);
        }
    }
  } catch (err: any) {
    handleErrorMsg(`${err}`)
  }
}

const handleErrorMsg = (err: string) => {
  if (err && err.includes("Read permission denied")) {
    messageFun('需要先同意网站读取剪贴板的权限~','warning')
  }
}

const handleClipContent = (fileType:string):boolean => {
  const types = ['png', 'jpg', 'jpeg'];
  return types.includes(fileType);
}

const messageFun = (msg,type:string) => {
  ElMessage({
    message:msg ,
    type: type,
    duration:4000
    })
}