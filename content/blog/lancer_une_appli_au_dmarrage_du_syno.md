---
title: Lancer une appli au démarrage du Syno
date: 2015-09-24
tags: ["NodeJs", "Syno"]
---


Placer le script sh dans  :
/usr/syno/etc/rc.d/

```shell
#!/bin/sh

case $1 in
start)
         forever start /volume1/repo_git/chatNodeJs/app.js
         exit 0
         ;;
stop)
         forever stopall
         exit 0
         ;;
restart)
         clean_data
         exit 0
         ;;
*)
  /bin/echo “usage: $0 { start | stop | restart }” >&2
    exit 1
             ;;
esac
```
