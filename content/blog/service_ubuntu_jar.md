---
title: Service ubuntu Jar
date: 2016-04-22
tags: ["Linux"]
---
**Créer** dans /etc/init.d/ un fichier planningmenuserver
```
#!/bin/sh
### BEGIN INIT INFO
# Provides:         planningmenuserver
# Required-Start:
# Required-Stop:
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: planningmenuserver
# Description:       planningmenuserver backend
### END INIT INFO

SERVICE_NAME=planningmenuserver
PATH_TO_JAR=/home/pi/apps/planningmenuserver/planningrepas-1.0-SNAPSHOT.jar
PID_PATH_NAME=/tmp/planningmenuserver-pid
case $1 in
    start)
        echo “Starting $SERVICE_NAME …”
        if [ ! -f $PID_PATH_NAME ]; then
            nohup java -jar $PATH_TO_JAR /tmp 2>> /dev/null >> /dev/null &
                        echo $! > $PID_PATH_NAME
            echo “$SERVICE_NAME started …”
        else
            echo “$SERVICE_NAME is already running …”
        fi
    ;;
    stop)
        if [ -f $PID_PATH_NAME ]; then
            PID=$(cat $PID_PATH_NAME);
            echo “$SERVICE_NAME stoping …”
            kill $PID;
            echo “$SERVICE_NAME stopped …”
            rm $PID_PATH_NAME
        else
            echo “$SERVICE_NAME is not running …”
        fi
    ;;
    restart)
        if [ -f $PID_PATH_NAME ]; then
            PID=$(cat $PID_PATH_NAME);
            echo “$SERVICE_NAME stopping …”;
            kill $PID;
            echo “$SERVICE_NAME stopped …”;
            rm $PID_PATH_NAME
            echo “$SERVICE_NAME starting …”
            nohup java -jar $PATH_TO_JAR /tmp 2>> /dev/null >> /dev/null &
                        echo $! > $PID_PATH_NAME
            echo “$SERVICE_NAME started …”
        else
            echo “$SERVICE_NAME is not running …”
        fi
    ;;
esac
```


Commande
```
sudo update-rc.d planningmenugui defaults
```
