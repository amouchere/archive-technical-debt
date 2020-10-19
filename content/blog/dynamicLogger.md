---
title: Création dynamique d'un logger 
date: 2017-02-21 09:20:48
tags: [java]
---

How to create a logback logger by the code:

```java

public class DynamicLogger {

    private static LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();

     public static Logger createSpecificLogger(final String fileName, final String loggingPath) {
        Logger logger = context.getLogger("dynamic_logger_" + fileName);

        // Don't inherit root appender
        logger.setAdditive(false);

        FileAppender fileAppender = new FileAppender();
        fileAppender.setContext(context);
        fileAppender.setName("dynamic_logger_fileAppender_" + fileName);

        // Optional
        fileAppender.setFile(loggingPath + "/" + fileName + ".log");
        fileAppender.setAppend(true);

        // set up pattern encoder
        PatternLayoutEncoder encoder = new PatternLayoutEncoder();
        encoder.setContext(context);
        encoder.setPattern("%d{dd-MM-yyyy HH:mm:ss,SSS} - %p | %m%n");
        encoder.start();

        fileAppender.setEncoder(encoder);
        fileAppender.start();

        // Attach appender to logger
        logger.addAppender(fileAppender);
        logger.setLevel(Level.TRACE);
    }
}


```
