---
title: SSH Config - se simplifier la conf SSH
date: 2016-02-02
tags: ["SSH", "Linux"]
---

Ajouter un fichier config dans son répertoire SSH perso.
```
vi ~/.ssh/config
```

Préciser une liste de Host / Hostname / User
```
Host myAlias
        Hostname 192.xxx.xxx.xxx
        User myUser
        Port 22
```

Pour se connecter
```
ssh myAlias
```

Au lieu de
```
ssh myUser@192.xxx.xxx.xxx -p 22
```

Copier la clé ssh publique sur un server distant
```
cat .ssh/id_rsa.pub | ssh sie017@192.168.131.162 ‘cat >> .ssh/authorized_keys’
```
