### 项目介绍
    create-react-app + antd + mobx + less
### 文件结构
    |--public                                
        |--index.html                       // html模板文件
        |--favicon.ico                      // 图标文件
        |--manifest.json                    // html文件配置
    |——src                                   
        |--api                              // 请求方法
        |--app                              // 页面组件
        |--components                       // 公共组件
        |--store                            // 状态管理
        |--.index.css                       // 默认css样式
        |--index.js                         // js入口文件
        |--route.js                         // 路由文件
        |--setupProxy.js                    // 代理文件
    |--.eslintrc.json                       // eslint文件
    |--.gitignore 
    |--config-overrides.js                  // 覆盖webpack默认文件
    |--package.json
    |--README.md            
### 项目使用
1. 全局变量(Get, Post, Patch, Delete, Put),使用时挂载在window对象上 => window.Get
2. 设置代理 => src/setupProxy.js
3. antd变量更改 => config-overrides.js
### create-react-app相关用法及文档
1. npm run analyze // 分析包的大小
2. [在开发环境使用https](https://facebook.github.io/create-react-app/docs/using-https-in-development)
4. [环境变量设置](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables)
5. [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
6. [proxy](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development)




