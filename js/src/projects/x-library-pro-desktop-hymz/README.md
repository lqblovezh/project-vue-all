hymz PC项目结构文档
====

```
|-- assets # 项目的样式，字体配置文件夹
	|-- fonts # 字体
	|-- img # 用于css样式引入的图片
	|-- js # 第三方工具库
	|-- stylus # 全局样式
		|-- base.styl # 基本样式
		|-- element.styl # 重写的element-ui样式
		|-- icon.styl # 图标样式
		|-- mixin.styl # 函数
		|-- page.styl # 页面的样式
		|-- reset.styl # 重置全局样式
		|-- variable.styl # 全局变量
|-- components
	|-- common # 全局组件
	|-- modules.js # 引入全局组件，并导出组件名
	|-- index.js # 将全局组件注入
|-- pages # 主要的压面
|-- static
	|-- images # 用于调试的图片
|-- store
	|-- index.js # store的入口文件
	|-- types.js # mutation的所有类型
	|-- modules # 分割的store模块
|-- utils # 个人定义的工具库
```

- 样式格式是`CSS BEM`，类似于`el-element__block-descriptor`

- 在`component`下的用于`pages`的组件，命名的开始单词用该模块的命名，例如`home`页面下的组件就是`HomePanel`，`subject`下的组件命名是`SubjectPanel`
- 组件的命名要全称，不需要缩写
- 基础的组件命名用`Base`开头，例如`BaseButton`
- `pages`下的组件命名都用`Camel-Case`
- 需要多次使用的组件可以在`components/modules`中引入