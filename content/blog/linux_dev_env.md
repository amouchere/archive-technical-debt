---
title: Apt-get configuration
date: 2016-06-10
tags: [Linux]
---


Apt-get Configuration
```
sudo vi /etc/apt/apt.conf.d/config.conf

Acquire::http::proxy "http://user:password@proxy-url:3128/";
Acquire::https::proxy "http://user:password@proxy-url:3128/";
```
