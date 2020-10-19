---
title: KeeCracker
date: 2018-01-28 14:54:05
tags: ["Windows", "Hacker"]
---

Pour (re)trouver le mot de passe d'un keypass par une simple attaque de type force brute.

* Télécharger keeCracker at http://keecracker.mbw.name/
* Générer un fichier texte de mot de passe candidat
* Exécuter la commande suivante. Le -T4 pour gérer multi-thread.

```
./KeeCracker.exe private.kdbx -w words.txt -T4
```

Avec ma vieille machine, j'ai assez de CPU pour tenter 174 mots de passe à la seconde.


Pour générer le fichier de candidat, j'ai utilisé une lib. java qui trouve tous les candidats à partir d'une regex.

Par exemple:
```
    PrintWriter writer = new PrintWriter("word.txt", "UTF-8");

    String regex = "[0-9]{0,4}";
    Generex generex = new Generex(regex);
    Iterator iterator = generex.iterator();
    while (iterator.hasNext()) {
        writer.println(iterator.next());
    }

    writer.close();
```

Avec la dépendance maven:
```
    <dependency>
        <groupId>com.github.mifmif</groupId>
        <artifactId>generex</artifactId>
        <version>1.0.2</version>
    </dependency>
```
