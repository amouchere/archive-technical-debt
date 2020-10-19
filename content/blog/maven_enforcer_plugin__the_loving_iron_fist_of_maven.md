---
title: Maven Enforcer Plugin - The Loving Iron Fist of Maven™
date: 2015-05-27
tags: ["Java", "Maven"]
---


```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-enforcer-plugin</artifactId>
  <version>1.4</version>
  <executions>
    <execution>
      <id>enforce-versions</id>
      <goals>
        <goal>enforce</goal>
      </goals>
      <configuration>
        <rules>
          <bannedPlugins>
            <!– will only display a warning but does not fail the build. –>
            <level>WARN</level>
            <excludes>
              <exclude>org.apache.maven.plugins:maven-surefire-plugin</exclude>
            </excludes>
            <message>Please consider using the maven-invoker-plugin !</message>
          </bannedPlugins>
          <requireMavenVersion>
            <version>2.0.6</version>
          </requireMavenVersion>
          <requireJavaVersion>
            <version>1.7</version>
            <message>1.7 java mini </message>
          </requireJavaVersion>
          <enforceBytecodeVersion>
            <maxJdkVersion>1.7</maxJdkVersion>
            <message>maxJdkVersion</message>
          </enforceBytecodeVersion>
          <requireOS>
            <family>windows</family>
          </requireOS>
        </rules>
      </configuration>
    </execution>
  </executions>
  <dependencies>
    <dependency>
      <groupId>org.codehaus.mojo</groupId>
      <artifactId>extra-enforcer-rules</artifactId>
      <version>1.0-beta-3</version>
    </dependency>
  </dependencies>
</plugin>
```

Permet de faire échouer la compilation lors de :

* l’utilisation de certains plugins
* l’utilisation de certaines versions de Maven
* l’utilisation d’une version de java pour la compilation
* l’utilisation de librairies compilées dans une certaine version de java
* l’utilisation de certains OS pour la compilation

[conférence parleys Devoxx2015](https://www.parleys.com/tutorial/quand-java-prend-de-la-vitesse-apache-maven-vous-garde-sur-les-rails)
[site du maven-enforcer-plugin](http://maven.apache.org/enforcer/maven-enforcer-plugin/)
