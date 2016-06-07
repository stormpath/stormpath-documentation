Dim logoutUrl = app.NewIdSiteUrlBuilder() _
    .SetCallbackUri("http://mysite.foo/idsiteCallback") _
    .ForLogout() _
    .Build()
