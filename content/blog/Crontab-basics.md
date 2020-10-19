---
title: Crontab basics
date: 2018-10-16 11:25:50
tags: ["Linux", "CRON", "Shell"]
---


## Principales commandes

```sh
crontab [-u user] -l    ## Liste les jobs pour l'utilisateur
crontab [-u user] -e    ## Edite les jobs pour l'utilisateur
crontab [-u user] -r    ## Supprime les jobs pour l'utilisateur

```

## Files

Un fichier est créé par table CRON (1 par user) dans /var/spool/cron/crontabs  (accessible en root)

## CRON

minute 	0-59  
hour 	0-23  
day of month 	1-31  
month 	1-12   
day of week 	0-7 (0 or 7 is Sunday)  


-> [https://crontab.guru](https://crontab.guru)

## Logs

Pour activer les logs des job CRON (sortie standard)
```sh
vi /etc/rsyslog.conf

```

Décommenter ou ajouter la ligne:  
**cron.*     /var/log/cron.log**

Redémarrer rsyslog:
```sh
 /etc/init.d/rsyslog restart
```

Les logs sont dans  
**/var/log/cron.log**
