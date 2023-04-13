---

title: "操作系统基础-PV操作"
date: 2022-05-13T10:10:11+08:00
draft: false
share: true
author: "Damon"
tags: ["OS", "操作系统"]
categories: ["OS"]
series: ["操作系统"]
image: "/images/os/pv.jpg"

---

### PV操作

> 一种实现进程互斥与同步的有效方法，P表示加锁的意思，V表示释放的意思。

### 互斥信号量

如下图所示，P1 ~ P4代表4个进程，S1 ~ S5是5个信号量。信号量的标注遵循一下原则：<span style="color:red">从小到大、从左到右，以及进程的执行顺序</span>

![](/images/os/进程互斥-信号量.png)

 那么使用PV操作进行控制P1 ~ P4并发执行过程如下：

1. P1执行：V(S1)、V(S2)
2. P3执行：P(S2)、V(S3)、V(S5) 
3. P2执行：P(S1)、P(S3)、V(S4)
4. P4执行：P(S4)、P(S5)









