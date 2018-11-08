# video_analysis
vue项目


1，开发环境
----
* 安装node
* 进入项目文件夹下，打开cmd，
* 输入`npm install`   【下载项目的依赖模块，】
ps：由于npm上下载模块可能会出现**网速不佳而下载失败的情况**，所以可以用以下方式替代这一步：
输入： `npm install -g cnpm --registry=https://registry.npm.taobao.org`
再输入 : `cnpm install`

2，ip修改替换：
------
将config/index.js文件中的` host: '10.10.29.164`修改为本机的ip，
将service/index.js文件中的ip地址修改为本机的ip

		app.listen(3000, function () {
          console.log('http://10.10.29.164:3000')
          return '10.10.29.164'
        });

将src/assets/js/api/index.js中`let testPath = 'http://10.10.29.164:3000'`修改为本机的ip

3，启动开发环境
------
* 在同级目录下，重新打开一个cmd，输入npm run server  --- 启动node后台
* 输入npm run dev	   ---- [开启本地开发环境]
启动成功后，直接在浏览器中输入cmd给出的页面地址就可以进入开发环境了。如` http://10.10.29.164:8088`

4，打包
----
开发环境下调试结束了，想要拿到最终的文件。就需要在当前目录层级下的cmd中输入`npm run build`

这样就会在同级目录下创建一个dist文件夹，并且生成相应的文件了。

dist文件夹里面的内容可以不依赖任何环境直接使用，直接当成普通的html就可以了。



