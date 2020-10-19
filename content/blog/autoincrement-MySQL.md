---
title: Vérifier l'autoincrément en MySQL
date: 2017-01-19 11:57:28
tags: ["SQL", "MySQL"]
description: "Retrouver la valeur de l'autoincrément en MYSQL"
---

Sur une base de donnée MySQL, pour identifier le type de colonne auto-incrémentée et vérifier la valeur courant de l'incrément. 


Utile pour vérifier si le seuil maximal du champ est bientôt atteint. 

``` sql
select
  t.TABLE_SCHEMA,
  t.TABLE_NAME,
  t.AUTO_INCREMENT,
  c.COLUMN_TYPE
from INFORMATION_SCHEMA.tables t, INFORMATION_SCHEMA.columns c
where t.TABLE_SCHEMA = c.TABLE_SCHEMA
      and t.TABLE_NAME = c.TABLE_NAME
      and t.AUTO_INCREMENT is not null
      and t.TABLE_SCHEMA like '%'
      and c.TABLE_SCHEMA like '%'
      and extra like '%auto_increment%'
order by CONCAT_WS('.', t.table_schema, t.TABLE_NAME) asc;


```
