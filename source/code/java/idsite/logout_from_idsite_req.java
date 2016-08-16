String idSiteUrl = application.newIdSiteUrlBuilder()
    .setCallbackUri("http://mysite.foo/idsiteCallback")
    .forLogout()
    .build();
