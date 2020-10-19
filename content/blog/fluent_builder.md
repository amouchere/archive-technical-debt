---
title: Fluent Builder
date: 2014-08-29
tags: ["Java", "TU"]
---

Dans les tests unitaires, on est souvent amené à créer divers objets initialisés de manière différente. C’est un travail vite laborieux et peu enrichissant. Un Builder est une classe d’outillage permettant de se simplifier la vie !

Voici l’objet que l’on veut créer.

```JAVA
public class Car {

    private int size;
    private String name;

    public void setSize(final int size) {
        this.size = size;
    }

    public void setName(final String name) {
        this.name = name;
    }
}
```

Notre builder va implémenter cette interface.
```JAVA
/**
  Interface to build a pre-initialized instance of the given class. .

  @param <T>. the object class.
 */
public interface Builder<T> {

    /
      This method is used to build a pre-initialized instance.

      @return a pre-initialized instance
     /
    T build();
}
```

Le CarBuilder :
```JAVA
public class CarBuilder implements Builder<Car> {

    private int size = 5; // default size
    private String name = “clio”; // default name

    @Override
    public Car build() {
        final Car result = new Car();
        result.setSize(this.size);
        result.setName(this.name);
        return result;
    }

    public CarBuilder setSize(final int size) {
        this.size = size;
        return this;
    }

    public CarBuilder setName(final String name) {
        this.name = name;
        return this;
    }
}
```

Pour créer une instance avec des attributs par défaut,  on utilisera:
```JAVA
Car myCar = new CarBuilder().build();
```

Pour un besoin particulier, on pourra créer une “car” avec des attributs particuliers:
```JAVA
Car myCar = new CarBuilder().setSize(8).build();
Car myCar = new CarBuilder().setName(“207”).build();
Car myCar = new CarBuilder().setSize(3).setName(“207”).build();
```
