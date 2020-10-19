---
title: Insérer du CDATA dans un flux SOAP
date: 2015-04-03
tags: ["Java", "Spring", "JAX-WS"]
---

```java
@Override
    public void handleMessage(final Message message) {
        message.put(“disable.outputstream.optimization”, Boolean.TRUE);
        final XMLStreamWriter writer = StaxUtils.createXMLStreamWriter(message.getContent(OutputStream.class));
        message.setContent(XMLStreamWriter.class, new CDataXMLStreamWriter(writer));
    }
```

```java
package com.amouchere.impl.soap.interceptor;

import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;

import org.apache.cxf.staxutils.DelegatingXMLStreamWriter;

/*
  This StreamWriter is used to put CDATA tag into xml when the xml node is “myTag”
 */
public class CDataXMLStreamWriter extends DelegatingXMLStreamWriter {


    private static String TAG_NAME = “myTag”;

    private String currentElementName;

    public CDataXMLStreamWriter(final XMLStreamWriter del) {
        super(del);
    }

    /

      @return true if the current element is the right one (CDATA).
     */
    private boolean checkIfCDATAneededForCurrentElement() {
        if (TAG_NAME.equals(this.currentElementName)) {
            return true;
        }
        return false;
    }

    @Override
    public void writeCharacters(final String text) throws XMLStreamException {
        final boolean useCData = this.checkIfCDATAneededForCurrentElement();
        if (useCData) {
            super.writeCData(text);
        } else {
            super.writeCharacters(text);
        }
    }

    @Override
    public void writeStartElement(final String prefix, final String local, final String uri) throws XMLStreamException {
        this.currentElementName = local;
        super.writeStartElement(prefix, local, uri);
    }
}
```
