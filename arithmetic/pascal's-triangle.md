---
title: "杨辉三角"
summary: "杨辉三角的简化理解"
date: 2018-11-28T10:34:03+08:00
draft: false
share: true
slug: "pascal's-triangle"
author: "Damon"
tags: ["python"]
categories: ["算法"]
---

# 杨辉三角
> 杨辉三角的性质：每个数等于它上方两数之和

## 思路
   根据上述杨辉三角性质，新的行，是根据上一行的值两两相加得来, 为了便于取值我们在计算下一行时可以为上一行补0，如下

```
     1                     0 1 0
    1 1                   0 1 1 0
   1 2 1        -->      0 1 2 1 0
  1 3 3 1               0 1 3 3 1 0
 1 4 6 4 1             0 1 4 6 4 1 0
```

例如当我们计算第三行时，可以给第二行补0，于是就有

```
     1
  0 1 1 0
   1 2 1
```

于是，代码逻辑就比较简单了:

```python
def triangles():
    N = [1]
    while True:
        yield N
        tmp = [0] + N + [0]
        N = [tmp[i] + tmp[i+1] for i in range(0, len(tmp)-1)]
```

## 进阶:
   此时已经搞清楚了计算思路，可以再搞搞上层建筑(优化)了^_^
   借助zip函数，可以很轻易的将相加的两个数放到一起，比如：

```
L = [1, 1]
# 左补0
LL = [0, 1, 1]
# 右补0
RL = [1, 1, 0]

zip(LL, Rl)    -> [(0, 1), (1, 1), (1, 0)]
# 对比左右补0 [0, 1, 1, 0]
```

代码可优化为:

```python
def triangles():
    N = [1]
    while True:
        yield N
        N = [sum(i) for i in zip([0] + N, N + [0])]
```

