---
title: Docker Tips
date: 2016-12-16 17:51:46
tags: ["Docker"]
---

To remove all existing containers (not images!) run

```bash

docker rm $(docker ps -aq)

```

To remove all images

```bash

docker rmi $(docker images -q)

```
