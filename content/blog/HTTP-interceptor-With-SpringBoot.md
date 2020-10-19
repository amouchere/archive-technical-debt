---
title: HTTP interceptor With SpringBoot
date: 2018-02-09 15:18:20
tags: ["Java", "SPRING"]
---


Le but de ces bouts de code est l'ajout d'un interceptor HTTP dans une application SpringBoot.


## Création de l'interceptor

```java
@Component
@Slf4j
public class RequestInterceptor implements HandlerInterceptor {

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object)
              throws Exception {
      // Something to do ?
      return true;
  }

  @Override
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object object,
              ModelAndView model) throws Exception {
      // Something to do ?
  }

  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object object,
              Exception arg3) throws Exception {
      // Something to do ?
  }
}

```

## Déclaration de l'interceptor via un bean de configuration

```java
@Configuration
public class WebInterceptorConfig extends WebMvcConfigurerAdapter {

    @Autowired
    private RequestInterceptor requestInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Add custom interceptor
        registry.addInterceptor(requestInterceptor);
    }

}

```
