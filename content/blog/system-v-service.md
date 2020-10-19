---
title: Création d'un service System D avec auto restart
date: 2016-09-27 21:18:36
tags: [Linux]
---

* Suppression du service System V (créé par la commande *sudo apt-get install tomcat8* ) :

```
sudo update-rc.d tomcat8 remove
sudo rm /etc/init.d/tomcat8
```

* Création d'un service System D:

```
sudo nano /etc/systemd/system/tomcat.service
```

* Compléter le script:

```
[Unit]
Description=Apache Tomcat Web Application Container
After=network.target

[Service]
Type=forking

Environment=JAVA_HOME=/usr/lib/jvm/default-java
Environment=CATALINA_PID=/opt/tomcat/temp/tomcat.pid
Environment=CATALINA_HOME=/usr/share/tomcat8
Environment=CATALINA_BASE=/var/lib/tomcat8
Environment='CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC'
Environment='JAVA_OPTS=-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom'

ExecStart=/usr/share/tomcat8/bin/startup.sh
ExecStop=/usr/share/tomcat8/bin/shutdown.sh

User=tomcat8
Group=tomcat8
RestartSec=10
Restart=always

[Install]
WantedBy=multi-user.target
