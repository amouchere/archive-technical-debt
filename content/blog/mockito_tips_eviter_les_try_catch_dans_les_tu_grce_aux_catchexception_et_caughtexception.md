---
title: "Mockito Tips: Eviter les try catch dans les TU avec AssertJ"
date: 2015-04-23
tags: ["Java", "AssertJ", "TU"]
---

Avec assertJ:

```java
@Test
public void testException() {
   // GIVEN some preconditions

   // WHEN
   Throwable thrown = catchThrowable(() -> { throw new Exception("boom!"); });

   // THEN
   assertThat(thrown).isInstanceOf(Exception.class).hasMessageContaining("boom");
}
```

Dépendance maven à ajouter:
```xml
<dependency>
    <groupId>org.assertj</groupId>
    <artifactId>assertj-core</artifactId>
    <version>3.3.0</version>
</dependency>
```
