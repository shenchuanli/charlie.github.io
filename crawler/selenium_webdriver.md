---
title: "Selenium_webdriver"
subtitle: ""
summary: "Selenium_webdriver下常见的chromium配置"
date: 2023-03-02T15:46:31+08:00
lastmod: "2022-10-01"
draft: false
image: "/images/crawler/selenium-chrome.png"
tags: ["crawler"]
categories: ["爬虫"]
series: ["Selenium"]
---

# Selenium中webdriver的介绍
> 版本：Selenium 4


## 1. webdriver的option
### 1.1 公共配置
#### pageLoadStrategy
共有三种类型的页面加载策略.

策略|就绪状态|设置|备注
---|---|---|---
normal（默认）|complete|options.page_load_strategy = 'normal'|等待所有资源下载完
eager| interactive |options.page_load_strategy = 'eager'|DOM 访问已准备就绪, 但诸如图像的其他资源可能仍在加载
none|Any|options.page_load_strategy = 'none'|完全不阻塞

#### acceptInsecureCerts
此功能检查在会话期间导航时 是否使用了过期的 (或) 无效的 TLS Certificate .

* 如果将功能设置为 **false**, 则页面浏览遇到任何域证书问题时, 将返回insecure certificate error . 
* 如果设置为 **true**, 则浏览器将信任无效证书.

默认情况下, 此功能将信任所有自签名证书. 设置后, acceptInsecureCerts 功能将在整个会话中生效

#### proxy 
代理服务器充当客户端和服务器之间的请求中介
使用代理服务器用于Selenium的自动化脚本, 可能对以下方面有益:

* 捕获网络流量
* 模拟网站后端响应
* 在复杂的网络拓扑结构或严格的公司限制/政策下访问目标站点.

### 1.2 各种浏览器的特殊配置
Seleniums使用add_argument(args)的方式，将args参数在启动浏览器时使用。

常见的chromium options有一下一些：

```python
options.add_argument('--headless') # 无头模式
options.add_argument('--user-agent={}'.format('your agent')) # 禁用缓存
options.add_argument('--window-size={},{}'.format(width, height)) # 直接配置大小和set_window_size一样
options.add_argument('--disable-gpu') # 禁用GPU加速
options.add_argument('--proxy-server={}'.format(self.proxy_server)) # 配置代理
options.add_argument('–-no-sandbox') # 沙盒模式运行
options.add_argument('–-disable-setuid-sandbox') # 禁用沙盒
options.add_argument('–-disable-dev-shm-usage') # 大量渲染时候写入/tmp而非/dev/shm
options.add_argument('–-user-data-dir={profile_path}'.format(profile_path)) # 用户数据存入指定文件
options.add_argument('--no-default-browser-check) # 不做浏览器默认检查
options.add_argument('–-disable-popup-blocking') # 允许弹窗
options.add_argument('–-disable-extensions') # 禁用扩展
options.add_argument('-–ignore-certificate-errors') # 忽略不信任证书
options.add_argument('–-no-first-run') # 初始化时为空白页面
options.add_argument('-–start-maximized') # 最大化启动
options.add_argument('–-disable-notifications') # 禁用通知警告
options.add_argument('–-enable-automation') # 通知(通知用户其浏览器正由自动化测试控制)
options.add_argument('–-disable-xss-auditor') # 禁止xss防护
options.add_argument('–-disable-web-security') # 关闭安全策略
options.add_argument('–-allow-running-insecure-content') # 允许运行不安全的内容
options.add_argument('–-disable-webgl') # 禁用webgl
options.add_argument('–-homedir={}') # 指定主目录存放位置
options.add_argument('–-disk-cache-dir={临时文件目录}') # 指定临时文件目录
options.add_argument('--disable-cache') # 禁用缓存
```

更加详细的可以参考[官网](https://peter.sh/experiments/chromium-command-line-switches/)
