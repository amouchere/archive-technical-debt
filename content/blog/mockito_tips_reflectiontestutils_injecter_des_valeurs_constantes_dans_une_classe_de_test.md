---
title: "Mockito Tips: ReflectionTestUtils injecter des valeurs constantes dans une classe de test"
date: 2015-04-28
tags: ["Java", "Mockito", "TU"]
---


Pour injecter des valeurs dans des attributs de la classe à tester.

```java
ReflectionTestUtils.setField(this.<maClasseTestee>, “maPropriété”, valeur);
```

Dépendance maven à ajouter:
```xml
<dependency>
 <groupId>org.springframework</groupId>
 <artifactId>spring-test</artifactId>
 <version>4.2.1.RELEASE</version>
 <scope>test</scope>
</dependency>
```
