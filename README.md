# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



## 项目设计
> 交互式图表项目，用户导入数据后，可以通过点击图表来展示深层数据。

## 项目背景
> 项目背景：
> 1. 项目初衷：
>    - 希望能够通过点击图表来展示深层数据，从而更好地理解数据背后的意义。
> 2. 项目目标：
>    - 实现一个交互式图表项目，用户导入数据后，可以通过点击图表来展示深层数据。
>    - 用户可以通过导出功能，导出一个可交互的网页。
>    - 或者为用户提供一个在线的在线演示。
 

## 项目创建过程

### 创建项目命令：npx create-react-app chart-interaction --template typescript
> * 项目常用命令
>   * 编译打包：`npm run build`
>   * 项目启动：`npm run start`

### 项目结构
> 参考文档：https://www.51cto.com/article/714477.html <br>
```
src
|
+-- assets            # 静态资源
|
+-- components        # 公共组件
|
+-- config            # 全局配置
|
+-- features          # 特性
|
+-- hooks             # 公用hooks
|
+-- lib               # 二次导出的第三方库
|
+-- providers         # 应用中所有providers
|
+-- routes            # 路由配置
|
+-- stores            # 全局状态stores
|
+-- test              # 测试工具、mock服务器
|
+-- types             # 全局类型文件
|
+-- utils             # 通用工具函数
```
> 
> 其中，features目录与components目录的区别在于：<br>
> components存放全局公用的组件，而features存放「业务相关特性」。<br>
> 比如我要开发「评论」模块，「评论」作为一个特性，与他相关的所有内容都存在于features/comments目录下。<br>
> 「评论」模块中需要输入框，输入框这个通用组件来自于components目录。<br>
> 所有「特性相关」的内容都会收敛到features目录下，具体包括：<br>
```
src/features/xxx-feature
|
+-- api         # 与特性相关的请求
|
+-- assets      # 与特性相关的静态资源
|
+-- components  # 与特性相关的组件
|
+-- hooks       # 与特性相关的hooks
|
+-- routes      # 与特性相关的路由
|
+-- stores      # 与特性相关的状态stores
|
+-- types       # 与特性相关的类型申明
|
+-- utils       # 与特性相关的工具函数
|
+-- index.ts    # 入口
```
### 添加远程仓库地址
* `git remote add origin https://github.com/z199172177/chart-interaction.git`
* 项目初始化，第一次提交可以强推：`git push origin master --force`
* 之后正常提交即可
  * git add .
  * git commit -m "doc"
  * git push origin master

### 配置git提交人
* 修改[.git/config](.git/config)文件，添加如下内容：
```
[user]
	name = zhuokun
	email = againkamisama@sina.cn
```

### 引入antd
* 命令: `npm install antd --save`

### 引入router：
* 命令: `npm install react-router-dom`
* 配置项目
   * 配置 RouterList.tsx
```typescript jsx
import React from "react";
import {Route, Routes} from "react-router-dom";
import App from "../features/app-feature/App";
function RouterList() {
    return (
        <Routes>
            <Route path="/" element={<App />}/>
        </Routes>
    );
}
export default RouterList;
```

* 配置 index.tsx
```typescript jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import RouterList from "./routes/RouterList";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <RouterList />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

### 引入axios
* 命令: `npm install axios`
* 配置 [axiosUtils.tsx](src/utils/AxiosUtils.tsx)

### 引入ant-charts
* 命令: `npm install @ant-design/plots --save`
* 命令: `npm install @ant-design/icons --save`
* 参考文档: https://ant-design-charts.antgroup.com/manual/getting-started

### 引入lodash
* 命令: `npm install lodash`
* 命令: `npm install @types/lodash`
* 参考文档：https://juejin.cn/post/7122424764211134500

### 引入eslint
* 命令：`npm install eslint@8.22.0 --save-exact`
* 解决 TypeError: this.libOptions.parse is not a function 报错
 
### 引入G2
* 命令：`npm install g2 --save`
* 命令：`npm install g2-react --save`