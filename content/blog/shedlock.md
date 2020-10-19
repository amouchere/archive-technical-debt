---
title: ShedLock
date: 2017-07-04 10:48:11
tags: ["Java", "SPRING"]
---


ShedLock s'assure qu'une tâche ne sera éxecutée qu'une seule fois à un instant t.
ShedLock utilise des verrous en BDD (mysql, Redis, ... ). 1 verrou par tâche ou groupe de tâche.

Peut-être une alternative à Quartz pour gérer des tâches ordonnancées dans un environnement multi-noeuds.

[source](https://github.com/lukas-krecan/ShedLock)


### Dépendances (jdbc lock provider)
```
<dependency>
   <groupId>net.javacrumbs.shedlock</groupId>
   <artifactId>shedlock-spring</artifactId>
   <version>0.12.0</version>
</dependency>

<dependency>
   <groupId>net.javacrumbs.shedlock</groupId>
   <artifactId>shedlock-provider-jdbc-template</artifactId>
   <version>0.12.0</version>
</dependency>
```

### Tâche
```
@Scheduled(fixedRate = 6000)
@SchedulerLock(name = "scheduledTaskName")
public void doYourTask() {
  // Do your task
}
```



### Configuration

fin de lock par défaut: defaultLockAtMostFor

```
@EnableScheduling
@Configuration
public class SchedulerConfiguration {

    @Bean
    public LockProvider lockProvider(DataSource dataSource) {
        return new JdbcTemplateLockProvider(dataSource);
    }

    @Bean
    public ScheduledLockConfiguration taskScheduler(LockProvider lockProvider) {
        return ScheduledLockConfigurationBuilder
                .withLockProvider(lockProvider)
                .withPoolSize(10)
                .withDefaultLockAtMostFor(Duration.ofMinutes(1))
                .build();
    }
}
```

Projet de test (SpringBoot/Docker): https://github.com/amouchere/shedlockDemo
