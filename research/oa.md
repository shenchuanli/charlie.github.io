---

title: "智能办公系统调研"
subtitle: "智能办公OA"
date: "2023-02-27T17:30:00+08:00"
lastmod: "2023-02-27"
draft: false
description: "调研智能办公系统的实现方式"
summary: "调研智能办公系统的实现方式"
image: "/images/research/oa.png"
tags: ["OA"]
categories: ["需求调研"]

---

# 智能办公系统调研
## 1. 功能汇总
功能模块|功能点
---|---
组织架构管理 | 人员管理 |
组织架构管理 | 组织架构管理  
邮件管理 | 联系人管理 
邮件管理 | 邮件管理 
邮件管理 | 邮件模板 
流程管理 | 流程管理  
公共事务 | 办公用品管理 
公共事务 | 车辆管理 
公共事务 | 公告管理
公共事务 | 公文管理 
公共事务 | 新闻管理  
个人事务 | 日历管理 
办公网盘 | 权限设置 
办公网盘 | 文件管理
办公网盘 | 文件夹管理 
IM系统 | 通讯录 
IM系统 | 定制消息类型  

## 2. 开源项目匹配分析
### 2.1 O2OA
> Server：Java
> IOS：Swift

[点我体验](https://sample.o2oa.net/x_desktop/index.html)

* 开发部员工1
* 公司领导1

**密码都是：2022@@o2**

功能匹配情况：

- [x] 组织架构（人员管理）
- [x] 组织架构（部门管理）
- [x] 邮件管理（联系人管理） --*不在邮件管理中*
- [ ] 邮件管理
- [ ] 邮件管理（邮件模板）
- [x] 流程管理  --*很复杂*
- [x] 办公用品管理 --*实际是办公用品管理和固定资产管理的结合*
- [ ] 车辆管理
- [x] 公告管理
- [ ] 公文管理
- [x] 新闻管理
- [x] 日历管理
- [ ] 办公网盘  --*不符合需求，只有简单的查看和下载*
- [x] IM消息（通讯录） --*基于选择创建*
- [ ] IM消息（定制消息类型）

**费用：商用许可每年8万**

## 3.对接企业微信
功能|企业微信|其他
---|---|---
组织架构（人员管理）| [成员管理](https://developer.work.weixin.qq.com/document/path/90195)|监听成员变更事件
组织架构（部门管理）| [成员管理](https://developer.work.weixin.qq.com/document/path/90205)|监听部门变更事件
邮件管理|-|需要开发，感觉可以按照站内信做
流程管理（流程管理）|[审批模板管理](https://developer.work.weixin.qq.com/document/path/97437)|依附于应用
流程管理（发起审批、处理）|[审批处理](https://developer.work.weixin.qq.com/document/path/91853)|处理审批状态变更事件
固定、办公资产管理|-|开发进销存应用
车辆管理|-|车辆也属于固定资产，秩序增加对应流程
公告、公文、新闻管理|-|cms，结合流程处理审批
日历管理|[日程](https://developer.work.weixin.qq.com/document/path/93647)|-
办公网盘|[微盘](https://developer.work.weixin.qq.com/document/path/93654)|-
IM消息|-|-
