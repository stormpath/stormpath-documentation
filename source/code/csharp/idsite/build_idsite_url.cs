var app = await client.GetApplicationAsync("application_url");

var idSiteUrl = app.NewIdSiteUrlBuilder()
    .SetCallbackUri("http://mysite.foo/idsiteCallback")
    .Build();
