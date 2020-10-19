---
title: Déclaration de client et serveur SOAP CXF avec Spring sans configuration XML
date: 2016-04-06
tags: ["Java", "Spring", "CXF", "JAX-WS"]
---


# Client SOAP
```java
@Configuration
@ComponentScan(basePackages = { “com.my.package” })
public class JavaConfig {

    @Autowired
    Environment env;

    @Bean
    public MyServicePortType myServiceClient() {
        String serviceUrl= env.getProperty(“my.service.url”);
        final JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
        factory.setAddress(serviceUrl);
        factory.setServiceClass(MyServicePortType e.class);
        return (MyServicePortType ) factory.create();
    }
}
```


Pour activer la validation des flux soap:
``` java
final MyServicePortType myPortType = (MyServicePortType) factory.create();
((BindingProvider) myPortType).getRequestContext().put(“schema-validation-enabled”, “true”);
return myPortType;
```

# Server SOAP
```java
@Configuration
@ImportResource({ “classpath:META-INF/cxf/cxf.xml”, “classpath:META-INF/cxf/cxf-servlet.xml” })
public class CXFServletConfiguration {

    /* CXF bus for binding.    */
    @Autowired
    private Bus bus;

    @Autowired
    private GetVersion getVersionService;

    @Bean
    public Endpoint versionEndpoint() {
        final EndpointImpl endpoint = new EndpointImpl(this.bus, this.getVersionService);
        endpoint.setAddress(“/version”);
        endpoint.publish();
        return endpoint;
    }
}
```
