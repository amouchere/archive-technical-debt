---
title: Construire son RPM avec Maven
date: 2014-08-19
tags: ["Maven", "RPM"]
---

Comment builder son RPM ? L’outil ‘rpmbuild’ semble bien nommé pour faire le job. Mais le build du projet étant fait avec Maven, il semble naturel d’intégrer cette construction avec un plugin Maven.

Plusieurs plugins Maven sont  disponibles mais je choisis rpm-maven-plugin de chez codehaus pour la quantité d’articles dédiés trouvés sur google.

```xml
<plugin>
     <groupId>org.codehaus.mojo</groupId>
     <artifactId>rpm-maven-plugin</artifactId>
     <version>2.0.1</version>
</plugin>
```


Il suffit donc d’insérer dans sa séquence de build l’appel au plugin. Beaucoup d’options et de configuration s’offrent à nous.  

```xml
<!– RPM generator –>
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>rpm-maven-plugin</artifactId>
    <executions>
        <execution>
            <id>rpm</id>
            <phase>package</phase>
            <goals>
                <goal>attached-rpm</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <copyright>2000-2014 Technical Debt.</copyright>
        <distribution>RH6.2 64</distribution>
        <group>Application/Collectors</group>
        <packager>Technical Debt</packager>
        <changelogFile>PathVersLeChangeLog/changelog.txt</changelogFile>
        <name>test-rpm</name>
        <version>${project.version}</version>
        <mappings>
            <!– RPM content –>
            <mapping>
                <directory>PathOuVousVoudrezInstallerVotreApp</directory>
                <filemode>640</filemode>
                <username>user-name</username>
                <groupname>user-group</groupname>
                <sources>
                    <source>
                        <location>PathDeCeQuiDoitEtreInclusDsLeRPM</location>
                        <includes>
                            <include>**</include>
                        </includes>
                    </source>
                </sources>
            </mapping>
         </mappings>
        <pretransScriptlet>
            <scriptFile>PathVersLesScripts/pretrans.sh</scriptFile>
            <fileEncoding>UTF-8</fileEncoding>
        </pretransScriptlet>
        <preinstallScriptlet>
            <scriptFile>PathVersLesScripts/preinstall.sh</scriptFile>
            <fileEncoding>UTF-8</fileEncoding>
        </preinstallScriptlet>
        <postinstallScriptlet>
            <scriptFile>PathVersLesScripts/postinstall.sh</scriptFile>
            <fileEncoding>UTF-8</fileEncoding>
        </postinstallScriptlet>
        <posttransScriptlet>
            <scriptFile>PathVersLesScripts/posttrans.sh</scriptFile>
            <fileEncoding>UTF-8</fileEncoding>
        </posttransScriptlet>
        <preremoveScriptlet>
            <scriptFile>PathVersLesScripts/preremove.sh</scriptFile>
            <fileEncoding>UTF-8</fileEncoding>
        </preremoveScriptlet>
        <postremoveScriptlet>
            <scriptFile>PathVersLesScripts/postremove.sh</scriptFile>
            <fileEncoding>UTF-8</fileEncoding>
        </postremoveScriptlet>
    </configuration>
</plugin>
```


Le tag ‘configuration’ est donc assez complet, je n’y ai mis que les choses qui me semblaient importantes mais cet exemple n’est pas exhaustif.
La liste exhaustive sur [le site officiel du plugin](http://mojo.codehaus.org/rpm-maven-plugin/ident-params.html).
On y retrouve d’abord tout ce qui concerne les droits et propriétaires de l’application. (copyright, distribution, group, packager).
On enchaine sur le changelog pour suivre l’historique et sur le nom et version du RPM. Pour la version, mettre la version du pom ( ${project.version} ) pour avoir une version dynamique sans effort.

Vient ensuite la balise Mappings. Ici, on va lister les éléments qui seront installés avec le RPM.
On peut en lister plusieurs. Un tab Mapping contient les éléments suivants:
- directory : le path où sera installer le composant sur la machine cible.
- filemode le chmod à utiliser sur le répertoire (ex: chmod 640)
- username: le user linux qui sera owner du répertoire
- groupname: le group name associé au répertoire. (la commande chown username:groupname sera exécutée sur le répertoire.)
- sources: la liste des sources à installer
- source: une source à installer. En attribut de la source, on retrouve le chemin de la source à installer.

A la fin de la configuration, il y a les path vers toutes les scriptlets.
Les scriptlets sont des scripts shell qui seront exécutés à différentes phases de l’installations. Pour plus d’infos sur l’ordre et les conditions d’exécution des scripts se référer à [ce lien](http://fedoraproject.org/wiki/Packaging:ScriptletSnippets#Scriptlet_Ordering).
Tous les scripts sont optionnels.


Afin d’avoir quelque chose d’un minimum industrialisé, il est bon de définir un profil maven pour exécuter ce plugin. (Le plugin nécessite l’application rpmbuild qui ne tourne que sous linux et ne tournera donc pas sur les machines de dev Windows.)
Enfin mettre le tout dans un job jenkins !
