---
title: CXF OneWay method
date: 2018-06-26 10:13:42
tags: ["Java", "Spring", "CXF"]
---

Un consumer SOAP par défaut fonctionne de manière synchrone.

Pour consommer une API de façon asynchrone, l'interceptor qui gère la réponse doit être configurée.

```JAVA
@Configuration
public class CxfClientConfig {

    @Value("${endpoint.url}")
    private String endpointUrl;

    @Bean
    public HwfServerPortType asyncClient() {
        final JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
        factory.setAddress(endpointUrl);
        factory.setServiceClass(HwfServerPortType.class);


        //Logging interceptor IN/OUT
        factory.getInInterceptors().add(new LoggingInInterceptor());
        factory.getOutInterceptors().add(new LoggingOutInterceptor());

        factory.getOutInterceptors().add(new AsyncInterceptor());

        return (HwfServerPortType) factory.create();
    }

    /**
     * For OneWay SOAP method (no return is expected)
     */
    final class AsyncInterceptor extends AbstractSoapInterceptor {

        AsyncInterceptor() {
            super(Phase.SETUP);
        }

        @Override
        public void handleMessage(final SoapMessage message) throws Fault {
            message.getExchange().setSynchronous(false);
        }

    }
}

```


Cet AsyncInterceptor permet également de traiter les méthodes SOAP n'attendant aucune réponse. (@OneWay) évitant ainsi des erreurs

```
java.net.SocketException: Unexpected end of file from server

...

Caused by: java.net.SocketException: Unexpected end of file from server

```
