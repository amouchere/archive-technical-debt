---
title: "Mockito Tips: Argument captor, récupérer les arguments passés aux mocks"
date: 2015-03-05
tags: ["Java", "Mockito", "TU"]
---

Définir un ArgumentCaptor pour récupérer les objets fournis à des mocks.
```java
final ArgumentCaptor<String> stringArgument = ArgumentCaptor.forClass(String.class);
when(this.monMock.maMethode(anyString()).thenReturn(“toto”);

// Verify we passed the right argument
verify(this.monMock, times(1)).maMethode(stringArgument.capture());
assertEquals(“tutu”, stringArgument.getValue());
```
