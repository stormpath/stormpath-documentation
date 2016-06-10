Dim app = Await client.GetApplicationAsync("application_url")

Dim idSiteUrl = app.NewIdSiteUrlBuilder() _
    .SetCallbackUri("http://mysite.foo/idsiteCallback") _
    .Build()
