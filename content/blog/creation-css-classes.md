---
title: Création de classes CSS en javascript
date: 2016-08-24 21:18:36
tags: [javascript, CSS]
---

Pour créer une classe CSS dynamiquement, il faut passer par la modification du DOM.

```javascript
// nouvel element de style
var style = document.createElement('style');

// définition du type
style.type = 'text/css';

// création d'une ou plusieurs classes CSS
style.innerHTML = '.myCssClass { color: #F00; }';

// Attacher l'élément au head de la page
document.getElementsByTagName('head')[0].appendChild(style);

// La classe myCssClass est dispo !

```
