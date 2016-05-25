var cacheProvider = CacheProviders.Create().InMemoryCache()
    .WithDefaultTimeToLive(TimeSpan.FromSeconds(120))
    .WithDefaultTimeToIdle(TimeSpan.FromSeconds(600))
    .WithCache(Caches.ForResource<IAccount>()
        .WithTimeToLive(TimeSpan.FromSeconds(900))
        .WithTimeToIdle(TimeSpan.FromSeconds(900)))
    .Build();

var client = Clients.Builder()
    .SetCacheProvider(cacheProvider)
    .Build();
