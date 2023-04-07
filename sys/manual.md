---
title: "使用手册"
subtitle: ""
date: 2023-02-23T17:57:55+08:00
lastmod: "2022-02-23"
draft: false
description: "介绍如何安装、使用此工具搭建自己的Blog"
summary: "介绍如何安装使用Hugo搭建自己的Blog。使用NewBee主题，评论功能使用Valine，详情可参考https://valine.js.org"
image: "/images/sys/man/help.png"
tags: ["帮助"]
categories: ["使用帮助"]
series: ["帮助文档"]
---
# Blog的搭建说明
## 1. 运行项目
 1. 安装[Hugo](https://gohugo.io/installation/)
 2. 安装[Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
 3. 克隆项目到本地<br>
    ```shell
    git clone git@github.com:LuckyCandy/blog.git
    ```
 5. 运行项目<br>
    ```shell
    cd blog
    # 使用主题默认配置
    cp themes/NewBee/config-example/config.toml config.toml
    # 启动服务
    hugo server -D
    ```
## 2.发布新内容
 1. 创建新文章<br>
    ```shell
    hugo new posts/你的文章.md
    ```
 2. 前置参数解释  

    你可以在文章前面添加.toml、.yaml或者.json格式的前置参数。  
 
    
    |**属性**|**解释**|
    |--|--|
    title|文章标题
    subtitle|文章副标题
    date|这篇文章创建的日期
    lastmod|最近修改内容的日期
    draft|在生成静态页面时记得改为true，否则除非使用了hugo -D或者hugo --buildDrafts命令, 否则这篇文章将不会被渲染。
    description|文章内容描述
    summary|文章摘要
    image|文章页首图片，没有则使用默认
    tags|文章标签
    categories|文章所属类别
    series|文章所属系列
    
 3.语法
* 全面支持Markdown，语法的详细说明参考[官方文档](https://markdown.com.cn/basic-syntax/)
* 更加丰富的功能，参考【Shortcodes】(https://hugoloveit.com/zh-cn/theme-documentation-extended-shortcodes/)

## 3.编译静态页，发布到Github
* 编译静态资源
```shell
# 此时前置参数daft：true的将不会编译
cd blog & hugo
# 执行完上一步会在public文件下生成所有的静态资源
cd public 
# 将这个目录的所有文件推送到Github
public % git add .
public % git commit -m "first commit"
public % git push
```