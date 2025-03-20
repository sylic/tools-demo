#构建阶段
FROM  node:22.5.1 as builder

# 设置工作目录
WORKDIR /app

# 项目文件夹的内容复制到工作目录
COPY . .

# 更改 NPM 下载源为淘宝源，并设置为全局持久化
RUN npm config set -g registry https://registry.npmmirror.com/

# 在工作目录中安装应用程序的依赖
RUN npm install

# 构建应用程序
RUN npm run build

# 运行阶段
FROM nginx:latest

# 设置工作目录(容器内)
WORKDIR /usr/share/nginx/html/

# 将当前目录下的所有文件复制到工作目录
COPY --from=builder /app/dist   /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf



# 暴露应用程序监听的端口
EXPOSE 5173

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]