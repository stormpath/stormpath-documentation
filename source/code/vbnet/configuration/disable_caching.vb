Dim client = Clients.Builder() _
    .SetCacheProvider(CacheProviders.Create().DisabledCache()) _
    .Build()
