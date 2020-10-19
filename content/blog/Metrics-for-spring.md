---
title: Metrics for spring
date: 2017-01-11 14:13:05
tags: ["Java", "SPRING"]
---

Add this dependency to the SpringBoot project.

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<dependency>
    <groupId>com.ryantenney.metrics</groupId>
    <artifactId>metrics-spring</artifactId>
    <version>3.1.3</version>
</dependency>

```


Activate the metrics in java config :

``` java
@Configuration
@EnableMetrics
public class MetricsConfig {

}

```

Annotate the function to monitor with @Timed

Explore the metrics with api :
http://localhost:8091/metrics



--> Official doc : https://github.com/ryantenney/metrics-spring
