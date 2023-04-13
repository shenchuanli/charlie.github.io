# 编译安装PHP7.4
> 操作环境：  
php: https://www.php.net/distributions/php-7.4.21.tar.gz  
os: CentOS Linux release 7.9.2009 (Core)  

## 1. 解压安装文件

```shell
# 一般我会把资源文件放到/usr/local/src下
$ cd /usr/local/src
# 没有wget可以yum安装下，或直接用curl也可以
$ wget https://www.php.net/distributions/php-7.4.21.tar.gz
$ tar -zxvf php-7.4.21.tar.gz
$ cd php-7.4.21
```

## 2. 安装依赖

```shell
# 以下依赖是下面configure必须使用到的，如果有其他额外配置可自行安装
$ yum install -y gcc gcc-c++ make zlib zlib-devel pcre pcre-devel libxml2 libxml2-devel krb5 krb5-devel openssl openssl-devel sqlite-devel m4 autoconf epel-release oniguruma oniguruma-devel
```

## 3. 安装libpcre2-8
```shell
$ cd /usr/local/src
$ wget https://ftp.pcre.org/pub/pcre/pcre2-10.35.tar.gz
$ tar -zxvf pcre2-10.35.tar.gz
$./configure --prefix=/usr/local/pcre2 \
  --enable-pcre2-16 \
  --enable-pcre2-32 \
  --enable-jit \
  --enable-jit-sealloc
$ make && make install
$ export PKG_CONFIG_PATH=/usr/local/pcre2/lib/pkgconfig/
```

## 4.编译安装php
```shell
$ cd /usr/local/src/php-7.4.21
$ ./configure \
  --prefix=/usr/local/php74 \
  --with-config-file-path=/usr/local/etc \
  --enable-fpm \
  --with-fpm-user=www \
  --with-fpm-group=www \
  --with-openssl \
  --with-kerberos \
  --with-system-ciphers \
  --with-external-pcre \
  --with-pcre-jit \
  --with-zlib \
  --with-pdo-mysql \
  --enable-bcmath \
  --enable-mbstring
# 如果没有出现错误就继续，反正我是没有😄
$ make
$ make install
```

## 5. 其他
* 配置PATH
* 自启动
* php.ini 以及 php-fpm.conf修改
