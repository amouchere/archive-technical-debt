---
title: Test de débit sur le réseau
date: 2016-09-22 20:43:46
tags:  ["Linux"]
---


Coté serveur

```bash
iperf -s
```

Coté client pour un test de 10 secondes (par défaut)

```bash
iperf -c 192.168.0.21
```


Coté client pour un test de 30 secondes

```bash
iperf -c 192.168.0.21 -t30
```
