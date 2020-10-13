---
title: Utiliser un intercepteur SOAP
date: 2015-04-03
tags: ["Java", "Spring", "JAX-WS"]
---

Pour ajouter un intercepteur SOAP, il suffit de le déclarer dans la déclaration du WS (appContext Spring). outInterceptor permet de définir qu'il s'agit d'intercepter les requêtes sortantes.

L'intercepteur étant lui même un bean Spring.

```xml
<jaxws:client ... >
         ...
        <jaxws:outInterceptors><ref bean="myInterceptor"/></jaxws:outInterceptors>
</jaxws:client>
```


Et le code de l'**interceptor**:
```java
package com.amouchere.soap.interceptor;

import java.io.OutputStream;

import javax.xml.stream.XMLStreamWriter;

import org.apache.cxf.interceptor.AttachmentOutInterceptor;
import org.apache.cxf.message.Message;
import org.apache.cxf.phase.AbstractPhaseInterceptor;
import org.apache.cxf.phase.Phase;
import org.apache.cxf.staxutils.StaxUtils;

/**
 * Interceptor used to handle soap request.
 */
public class CDataWriterInterceptor extends AbstractPhaseInterceptor<Message> {

    /**
     * constructor.
     */
    public CDataWriterInterceptor() {
        super(Phase.PRE_STREAM);
        this.addAfter(AttachmentOutInterceptor.class.getName());
    }

    @Override
    public void handleMessage(final Message message) {
       // DO MY JOB
    }
}
```
