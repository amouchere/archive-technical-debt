---
title: Liste d'annotation
date: 2017-09-30 22:17:41
tags: ["Linux","Shell"]
---


**Lister les annotations utilisées dans un projet Java**

```
cat **/*.java | grep @ | sed 's/\(.*\)\(@[A-Za-z]*\)\([( ].*\)/\2/' | sort -b | sed -e 's/^[ \t]*//g' | uniq
```
