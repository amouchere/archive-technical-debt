---
title: Disk Usage
date: 2018-12-24 13:25:53
tags: ["Linux"]
---


Afficher l'usage disque du répertoire courant (human readable & trié) :

```
du -sch * | sort -h
```


Pour inclure les dossiers cachés: 


```
du -sch * .* | sort -h
```
