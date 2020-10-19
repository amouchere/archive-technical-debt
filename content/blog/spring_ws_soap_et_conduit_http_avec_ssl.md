---
title: "Spring: WS SOAP et conduit http avec SSL"
date: 2015-03-05
tags: ["Spring", "JAX-WS", "SSL"]
---
Je n'ai pas trouvé l'équivalent en java config...

```xml
<jaxws:client id=“mService”
    serviceClass=“com.amouchere.MyServiceSoap”
    serviceName=“tns:MyService”
    address=“#myServiceAddress“
    xmlns:tns=“http://amouchere.com/“
    wsdlLocation=“classpath:/wsdl/my.wsdl”
    endpointName=“tns:MyServiceSoap”>

    <jaxws:properties>
        <entry key=“schema-validation-enabled” value=“true” />
    </jaxws:properties>
    <jaxws:features>
        <bean class=“org.apache.cxf.feature.LoggingFeature” />
    </jaxws:features>
    <jaxws:outInterceptors>
        <ref bean=“myInterceptorBean”/>
    </jaxws:outInterceptors>
</jaxws:client>


<http:conduit name=“{http://amouchere.com/}MyServiceSoap.http-conduit“>

    <http:tlsClientParameters useHttpsURLConnectionDefaultSslSocketFactory=“false”>
        <sec:certAlias>${alias}</sec:certAlias>
        <sec:keyManagers keyPassword=“${key.password}“>
            <sec:keyStore type=“JKS” password=“${keystore.password}“ file=“${keystore.file}“ />
        </sec:keyManagers>
        <sec:trustManagers>
            <sec:keyStore type=“JKS” password=“$truststore.password}“ file=“${truststore.file}“ />
        </sec:trustManagers>
    </http:tlsClientParameters>

    <http:client
        ProxyServer=“${proxy.host}“
        ProxyServerPort=“${proxy.port}“
        NonProxyHosts=“${proxy.nonProxyHosts}“ />
    <http:proxyAuthorization>
        <sec:UserName>${proxy.user}</sec:UserName>
        <sec:Password>${proxy.password}</sec:Password>
    </http:proxyAuthorization>
</http:conduit>
```
