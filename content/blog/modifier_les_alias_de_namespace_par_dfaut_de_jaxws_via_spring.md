---
title: Modifier les alias de namespace par défaut de jax-ws via Spring
date: 2014-11-05
tags: ["Java", "Spring", "JAX-WS"]
---

**Dans l'application context, ajouter dans la définition du endpoint une balise dataBindings.**
```xml
<jaxws:endpoint id="endpointID" implementor="#myImpl" address="/myService" wsdlLocation="classpath:/myWsdl.wsdl">
 <jaxws:properties>
  <entry key="schema-validation-enabled"value="true" />
 </jaxws:properties>
 <jaxws:dataBinding>
  <bean class="org.apache.cxf.jaxb.JAXBDataBinding">
   <property name="namespaceMap">
    <map>
     <entry>
      <key>
           <value>http://NamespaceToMap</value>
      </key>
      <value>myNs</value>
     </entry>
    </map>
   </property>
  </bean>
 </jaxws:dataBinding>
</jaxws:endpoint>
```

**Avant**
```xml
<ManifestHeader>
   <ns1:year xmlns:ns1="http://NamespaceToMap">2014</ns1:year>
</ManifestHeader>
```

**Après**
```xml
<ManifestHeader>
   <myNs:year xmlns:myNs="http://NamespaceToMap">2014</myNs:year>
</ManifestHeader>
```
