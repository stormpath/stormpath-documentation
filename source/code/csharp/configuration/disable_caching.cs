var client = Clients.Builder()
    .SetCacheProvider(CacheProviders.Create().DisabledCache())
    .Build();
