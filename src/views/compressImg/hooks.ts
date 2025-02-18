//canvas 压缩图片
import type {  UploadRawFile } from 'element-plus'
export const compressImage = async (file: UploadRawFile) => {
  return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = function(event) {
			const img = new Image();
			img.onload = function() {
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");
                
				// 调整canvas大小为原图的80%
				canvas.width = img.width * 0.8;
				canvas.height = img.height * 0.8;
                
				// 绘制图片到canvas
				ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
                
				// 转换canvas内容为Blob
				canvas.toBlob(blob => {
					if (!blob) {
						reject(new Error("Failed to convert image to blob"));
						return;
					}
                    
					// 创建新的File对象
					const compressedFile = new File([blob], file.name, { type: file.type });
					resolve(compressedFile);
				}, "image/jpeg", 0.8); // 第三个参数是质量因子
			};
			img.src = event.target!.result as string;
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}