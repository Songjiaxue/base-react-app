### 项目介绍
    create-react-app + antd + mobx + less
### 文件结构
    |--public                                
        |--index.html                       // html模板文件
        |--favicon.ico                      // 图标文件
        |--manifest.json                    // html文件配置
    |--server                               // 模拟数据
        |--api                              // 模拟接口
        |--bin                              // 启动文件
        |--routes                           // 接口地址
        |--app.js                           // 入口文件
    |——src                                   
        |--api                              // 请求方法
        |--app                              // 页面组件
            |--container                    // 包含公共框架的页面
                |--common                   // 公共页面组件
                    |--crumb                // 面包屑
                    |--footer               // 底部组件
                    |--header               // 头部组件
                    |--sider                // 侧边栏
                |--home                     // 组件公共框架，包含头部，侧边栏，底部
                |--page                     // 页面需要填充的内容区域
                |--route.js                 // 页面内容区域路由
            |--login                        // 登录页面
        |--assets                           // 静态资源文件
            |--img                          // 图片
            |--style                        // 公共样式
        |--components                       // 公共组件
        |--store                            // 状态管理
        |--index.css                       // 默认css样式
        |--index.js                         // js入口文件
        |--route.js                         // 路由文件
        |--setupProxy.js                    // 设置代理
    |--.eslintignore                        // eslint忽略文件
    |--.eslintrc.json                       // eslint文件
    |--.gitignore 
    |--config-overrides.js                  // 覆盖webpack默认文件
    |--package.json
    |--README.md            
### 项目使用
1. 全局变量(Get, Post, Patch, Delete, Put, moment),使用时挂载在window对象上 => window.Get
2. 设置代理 => src/setupProxy.js
3. antd变量更改 => config-overrides.js
4. 模拟数据使用:
``````
    cd server && npm install
    npm start
``````
5. 路径别名：   
``````
    "@assets": path.resolve(__dirname, "src/assets"),
    "@app": path.resolve(__dirname, "src/app"),
    "@components": path.resolve(__dirname, "src/components"),
    "@store": path.resolve(__dirname, "src/store"),
    "@util": path.resolve(__dirname, "src/util"),
``````
### create-react-app相关用法及文档
1. npm run analyze // 分析包的大小
2. [在开发环境使用https](https://facebook.github.io/create-react-app/docs/using-https-in-development)
4. [环境变量设置](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables)
5. [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
6. [proxy](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development)




