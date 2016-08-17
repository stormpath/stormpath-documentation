String idSiteUrl = application.newIdSiteUrlBuilder()
    .setCallbackUri("http://mysite.foo/idsiteCallback")
    .setPath("/#/reset")
    .setSpToken(tokenString)
    .build();
