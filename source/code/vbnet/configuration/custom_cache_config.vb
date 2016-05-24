Dim cacheProvider = CacheProviders.Create().InMemoryCache().
    WithDefaultTimeToLive(TimeSpan.FromSeconds(120)).
    WithDefaultTimeToIdle(TimeSpan.FromSeconds(600)).
    WithCache(Caches.ForResource(Of IAccount)() _
        .WithTimeToLive(TimeSpan.FromSeconds(900)) _
        .WithTimeToIdle(TimeSpan.FromSeconds(900))) _
    .Build()

Dim client = Clients.Builder().SetCacheProvider(cacheProvider).Build()
