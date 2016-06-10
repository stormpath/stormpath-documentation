var logoutUrl = app.NewIdSiteUrlBuilder()
    .SetCallbackUri("http://mysite.foo/idsiteCallback")
    .SetPath("/#/reset")
    .SetSpToken(sptoken_from_url)
    .Build();
