# 自定义vue-cli（脚手架）

> 根据不同项目的需求，配置不同的初始化脚手架.比如在脚手架init的选项中,添加或删除一些选项，根据选项的不同，加载不同的文件或代码块到项目代码中.

![](https://github.com/LvJinCheng/vuejs-templates-custom/raw/master/img/demo.jpg)  

## 准备
1.github上,fork官方模板（地址：https://github.com/vuejs-templates/webpack ）,到自己的github.

2.将fork到自己库上的模板代码clone到本地文件.`git clone https://github.com/LvJinCheng/webpack.git`

3.克隆完成,进入文件夹,项目默认的github分支是develop,为了以后操作方便，要切换到自己github上的master分支.`git checkout -b master`

4.切换之后,为了防止分支之间代码冲突,要重新拉去master分支代码到本地.`git pull origin master`

## 修改代码
1.在clone的项目中找到如下文件
* /meta.js
* /scenarios/full.json
* /template/src/main.js

2.首先修改meta.js,也就是vue-cli初始化时的选项,yes或者no,也可以选择某一项.

``` bash
 prompts: {
  name: {
    when: 'isNotTest',
    type: 'string',
    required: true,
    message: 'Project name',
  },
     ...
}
```
   如果要添加一项："是否是移动端？",或是多项选择,只需复制name对象到后面,然后进行修改.
``` bash
  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: 'Project name',
    },
    //____________yes or no____________
    isMobile: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: '是否是移动端？',
    },
    //____________多项选择____________
    doSomething: {
      when: 'isNotTest',
      type: 'list',
      message:
        '这是一个多项选择',
      choices: [
        {
          name: 'Yes, 我要加载A',
          value: 'A',
          short: 'A',
        },
        {
          name: 'Yes, 我要加载B',
          value: 'B',
          short: 'B',
        },
        {
          name: 'No, 什么都不做',
          value: false,
          short: 'no',
        },
      ],
    },
     ...
 }
```
3.找到full.json文件,把刚加的isMobile和doSomething添加进去,分别设置默认值为true和"A".
``` bash
 { 
   "isMobile": true, // 设置默认值
   "doSomething": 'A' // 设置默认值
   "noEscape": true,
   "name": "test",
   "description": "A Vue.js project",
   "author": "CircleCI",
   "build": "runtime",
   "router": false,
   "autoInstall": false
 }
```
4.在初始化选择了yes或者是某一项,可以在main.js中根据条件是否执行某些代码判断,使用的是Handlebars.js 模板引擎如:
``` bash
{{#isMobile}}
  import router from './isMobile' //或者是加载模块
  console.log('这是移动端') //是代码块
{{/isMobile}}

//多项选择时 匹配选择的值
{{#if_eq doSomething "A"}}
  alert('你选择的是A')
{{/if_eq}}

{{#if_eq doSomething "B"}}
  alert('你选择的是B')
{{/if_eq}}
```
5.也可以按条件加载某些文件,回到meta.js中找到对象
``` bash
filters: {
  'src/isMobile/*/': 'isMobile' //配置为true是引用到项目中
  'test/unit/*/': 'unit',
  'src/router/*/': 'router',
}
```
6.上传代码到github上.
7.初始化自定义如本项目自定义模板 `vue-cli vue init LvJinCheng/webpack my-project`.
