var logoutUrl = app.NewIdSiteUrlBuilder()
    .SetCallbackUri("http://mysite.foo/idsiteCallback")
    .ForLogout()
    .Build();
