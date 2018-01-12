## 安装
### 直接 clone git 仓库

```bash
$ git clone --depth=1https://github.com/wangmj/boc-smart-notfun my-project
$ cd my-project
```

### 安装
```bash
$ npm install
```

###运行
```bash
$ npm run dev
```
  
## 目录结构

下面是整个项目的目录结构。

```bash
├── build                    #webpack配置
├── config                   #webpack编译时的一些环境变量
├── mock                     # 本地模拟数据
├── src
│   ├── assets               # 本地静态资源
│   ├── common               # 应用公用配置，如导航信息
│   ├── components           # 业务通用组件
│   ├── layouts              # 通用布局
│   ├── pages                # 业务页面入口和常用模板
│   ├── utils                # 工具库
│   ├── app.vue              # 应用入口
│   └── main.js              # 应用js入口
├── tests                    # 测试工具
├── index.html               #spa首页模版
├── README.md
└── package.json