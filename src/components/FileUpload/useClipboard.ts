import { ElMessage } from 'element-plus'
export const useClipBoard = async ():Promise<any> => {
  try {
    const clipboard = await navigator.clipboard.read();
     for (const clipboardItem of clipboard) {
       for (const type of clipboardItem.types) {
         let fileType = type.split('/')[1]; // 文件类型
         // 判读文件类型是否满足
         if (!handleClipContent(fileType)) {
           ElMessage({
              message: '剪贴板中的文件类型不是png、jpg、jpeg格式，请重新复制~',
              type: 'error',
              duration:4000
           })
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
    ElMessage({
      message: '需要先同意网站读取剪切板的权限~',
      type: 'warning'
    })
  }
}

const handleClipContent = (fileType:string):boolean => {
  const types = ['png', 'jpg', 'jpeg'];
  return types.includes(fileType);
}