---
title: Log Request Filter for Spring application
date: 2018-02-09 16:25:39
tags: ["Java","SPRING"]
---


Pour logguer les requêtes HTTP entrantes, Spring fournit des outils "out of the box".

```Java
@Bean
public CommonsRequestLoggingFilter requestLoggingFilter() {
    CommonsRequestLoggingFilter loggingFilter = new CommonsRequestLoggingFilter();
    loggingFilter.setIncludeClientInfo(true);
    loggingFilter.setIncludeQueryString(true);
    loggingFilter.setIncludePayload(true);
    return loggingFilter;
}


// Un peu de configuration logback aussi
logging.level.org.springframework.web.filter.CommonsRequestLoggingFilter=DEBUG.
```

Et les requetes entrantes sont logguées... mais tout ca n'est pas très personnalisable.  

On peut aussi passer par un interceptor HTTP ou un filtre de requêtes.

En voici une implémentation pour logguer les requêtes mais aussi les réponses. En bonus les paramètres de requêtes, le status HTTP, et pourquoi les header ...

```Java

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import org.apache.commons.io.output.TeeOutputStream;
import org.springframework.core.Ordered;
import org.springframework.mock.web.DelegatingServletOutputStream;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.WebUtils;

import lombok.extern.slf4j.Slf4j;

/**
 * A filter which logs http request and response
 */
@Slf4j
@Component
public class LogRequestFilter extends OncePerRequestFilter implements Ordered {

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE - 8;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        final PrintStream ps = new PrintStream(baos);

        ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper(request);
        final ResponseWrapper wrappedResponse = new ResponseWrapper(response, ps);

        // pass through filter chain to do the actual request handling
        filterChain.doFilter(wrappedRequest, wrappedResponse);

        // body can only be read after the actual request handling was done!
        logRequest(wrappedRequest);
        logResponse(response, baos);
    }

    private void logResponse(HttpServletResponse httpResp, ByteArrayOutputStream baos) {
        Map<String, Object> trace = new LinkedHashMap<>();
        trace.put("status", httpResp.getStatus());
        trace.put("body", baos.toString());
        log.debug(String.format("Response trace '%s'", trace));
    }

    private void logRequest(ContentCachingRequestWrapper request) {
        Map<String, Object> trace = new LinkedHashMap<>();
        trace.put("method", request.getMethod());
        trace.put("path", request.getRequestURI());
        trace.put("query", request.getQueryString());
        trace.put("body", getBody(request));
        log.debug(String.format("Request trace '%s'", trace));
    }

    private String getBody(ContentCachingRequestWrapper request) {
        // wrap request to make sure we can read the body of the request (otherwise it will be consumed by the actual request handler)
        ContentCachingRequestWrapper wrapper = WebUtils.getNativeRequest(request, ContentCachingRequestWrapper.class);

        String body = "";
        if (wrapper != null) {
            byte[] buf = wrapper.getContentAsByteArray();
            if (buf.length > 0) {
                try {
                    body = new String(buf, 0, buf.length, wrapper.getCharacterEncoding());
                } catch (UnsupportedEncodingException ex) {
                    body = "[unknown]";
                }
            }
        }
        return body;
    }

    /**
     * Inner class to wrap HttpResponse in order to print response body
     */
    private class ResponseWrapper extends HttpServletResponseWrapper {

        private PrintStream ps;

        /**
         * Constructs a response adaptor wrapping the given response.
         *
         * @param response The response to be wrapped
         * @throws IllegalArgumentException if the response is null
         */
        ResponseWrapper(final HttpServletResponse response, final PrintStream ps) {
            super(response);
            this.ps = ps;
        }

        @Override
        public ServletOutputStream getOutputStream() throws IOException {
            return new DelegatingServletOutputStream(new TeeOutputStream(super.getOutputStream(), ps));
        }

        @Override
        public PrintWriter getWriter() throws IOException {
            return new PrintWriter(new DelegatingServletOutputStream(new TeeOutputStream(super.getOutputStream(), ps)));
        }
    }

}
```
