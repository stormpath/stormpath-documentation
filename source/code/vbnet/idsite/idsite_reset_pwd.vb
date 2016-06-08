Dim logoutUrl = app.NewIdSiteUrlBuilder() _
              .SetCallbackUri("http://mysite.foo/idsiteCallback") _
              .SetPath("/#/reset") _
              .SetSpToken(sptoken_from_url) _
              .Build()
