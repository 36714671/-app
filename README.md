# CSDN
vue-socket.io实现即时聊天

需要注意的是，你vue项目的端口号是不是8080，如果不是，记得修改node服务器的跨域请求的端口。

## 项目的启动方法：

### 安装依赖

+ 现在项目是没有node_module的，所以需要我们自己安装，方法如下：
+ 进入到项目中（两个分别安装），输入 npm i --s,等待安装即可。(建议加上--s ,这样是从package-lock.json中直接下载对应版本，速度相对快。)


### 启动项目
+ 启动vue项目：npm run serve
+ 启动socket服务：node index.js
+ 注意：一定是在相应的文件夹下面呀



