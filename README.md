# 让微信小程序支持sass

## Install

``` shell

# 克隆项目
git clone

# 安装依赖
npm install
```

## Usage

``` shell

# 运行
npm run dev

# 构建发布程序
npm run build

# 重置src中的scss
npm run reset

```

## Tips

* 本示例程序默认开发者已经对微信小程序有初步认识
* 将小程序的开发路径指向src目录
* 本构建任务是为了方便使用scss语法，提高开发效率
* 在src源码包里生成*.wxss是为了方便编辑器的切换(微信开发者工具与自己常用的编辑器)
* 开发者可使用常用的编辑器进行页面布局和样式定义，而此时开发者工具则充当浏览器的角色

## Third-party libraries

* [wxParse](https://github.com/icindy/wxParse) 微信小程序富文本解析自定义组件
* [es6-promise](https://github.com/stefanpenner/es6-promise) A polyfill for ES6-style Promises
