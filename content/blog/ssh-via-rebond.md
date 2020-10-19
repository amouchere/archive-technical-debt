---
title: ssh via rebond
date: 2018-10-24 15:27:31
tags: ["SSH", "Linux"]
---


Modifier le fichier config dans son répertoire SSH perso.
```
vi ~/.ssh/config
```

Préciser une liste de Host / Hostname / User
```
Host myAlias
  Hostname <IP Cible derriere le rebond>
  Port 22
  User <User cible>
  ProxyCommand ssh <userRebond>@<IP Rebond> -W %h:%p
```

Pour se connecter
```
ssh myAlias
```
