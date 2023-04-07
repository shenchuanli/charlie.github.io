---

title: "javax.validation"
date: 2022-03-11T13:26:11+08:00
draft: false
share: true
slug: "javax.validation"
author: "Damon"
tags: ["java", "validation"]
categories: ["Java"]
image: "/images/java/validate.png"

---


# javax.validation使用说明

> 使用`javax.validation`的一系列注解可以帮我们完成参数校验,免去繁琐的串行校验。

## 引入maven依赖

```xml
    <dependency>
    	<groupId>javax.validation</groupId>
    	<artifactId>validation-api</artifactId>
    	<version>1.1.0.Final</version>
    </dependency>
    <!-- 实现以及拓展 -->
    <dependency>
		<groupId>org.hibernate</groupId>
		<artifactId>hibernate-validator</artifactId>
		<version>5.4.1.Final</version>
    </dependency>
```



## 注解说明

| 注解                                         | 验证类型                                                     | 说明                                                         |
| -------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| @AssertFalse                                 | Boolean, boolean                                             | 验证是否为false                                              |
| @AssertTrue                                  | Boolean, boolean                                             | 验证是否为false                                              |
| @NotNull                                     | Object                                                       | 是否不为null                                                 |
| @Null                                        | Object                                                       | 是否为null                                                   |
| @Min                                         | BIgDecimal, BigInteger, Byte, short, int, long等Number或CharSequence子类型 | 是否小于等于指定值                                           |
| @Max                                         | 同@Min                                                       | 是否大于等于指定值                                           |
| @DecimalMin                                  | 同@Min                                                       | 验证注解的元素值大于等于@ DecimalMin指定的value值            |
| @DecimalMax                                  | 同@Min                                                       | 验证注解的元素值小于等于@ DecimalMin指定的value值            |
| @Digits(integer=整数位数, fraction=小数位数) | 同@Min                                                       | 验证注解的元素值的整数位数和小数位数上限                     |
| @Size(min=下限, max=上限)                    | 字符串、Collection、Map、数组等                              | 验证注解的元素值的在min和max（包含）指定区间之内，如字符长度、集合大小 |
| @Past                                        | java.util.Date,java.util.Calendar;Joda Time类库的日期类型    | 验证注解的元素值（日期类型）比当前时间早                     |
| @Future                                      | 同@Past                                                      | 验证注解的元素值（日期类型）比当前时间晚                     |
| @NotBlank                                    | CharSequence子类型                                           | 去除首位空格后长度不为0                                      |
| @Length(min=下限, max=上限)                  | CharSequence子类型                                           | 验证注解的元素值长度在min和max区间内                         |
| @NotEmpty                                    | CharSequence子类型、Collection、Map、数组                    | 验证注解的元素值不为null且不为空                             |
| @Range(min=最小值, max=最大值)               | BigDecimal,BigInteger,CharSequence, byte, short, int, long等原子类型和包装类型 | 验证注解的元素值在最小值和最大值之间                         |
| @Email(regexp=正则表达式,flag=标志的模式)    | CharSequence子类型                                           | 验证注解的元素值是Email，也可以通过regexp和flag指定自定义的email格式 |
| @Valid                                       | 任何非原子类型                                               | 指定递归验证关联的对象如用户对象中有个地址对象属性，如果想在验证用户对象时一起验证地址对象的话，在地址对象上加@Valid注解即可级联验证 |
