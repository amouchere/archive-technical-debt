---
title: JGitFlow
date: 2017-05-12 14:07:30
tags: ["Git", "Maven"]
---
Le plugin maven <tt>jgit-flow</tt> est utilisé afin de simplifier au maximum la création d'une ''release'' pour un module autonome :
* <tt>release-start</tt> :
  * création d’une branche de stabilisation (''release'') pour une version donnée
  * montée en version mineure de la branche <tt>develop</tt> ;
* <tt>release-finish</tt> : finalisation de la ''release'' :
  * suppression du suffix <tt>-SNAPSHOT</tt>,
  * merge sur <tt>master</tt>
  * création du tag

# Prérequis
* Vérifier que le pom.xml contient la configuration suivante :
```xml
    <plugin>
        <groupId>external.atlassian.jgitflow</groupId>
        <artifactId>jgitflow-maven-plugin</artifactId>
        <version>1.0-m5.1</version>
        <configuration>
            <flowInitContext>
                <masterBranchName>master</masterBranchName>
                <developBranchName>develop</developBranchName>
                <versionTagPrefix>v-</versionTagPrefix>
            </flowInitContext>
            <noDeploy>true</noDeploy>
            <squash>false</squash>
            <scmCommentPrefix>[RELEASE] </scmCommentPrefix>
            <useReleaseProfile>false</useReleaseProfile>
        </configuration>
    </plugin>
```
* Avoir les branches locales <tt>develop</tt> et <tt>master</tt> à jour.

# Démarrage de la ''release''
```
 mvn jgitflow:release-start
```
# Finalisation de la ''release''
```
 mvn jgitflow:release-finish
```
Puis, pousser les branches <tt>master</tt> et <tt>develop</tt> et les tags


```
 git push origin master
 git push origin develop
 git push --tags
 ```
