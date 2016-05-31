var client = Clients.Builder()
    .SetCacheProvider(CacheProviders.Create().RedisCache()
        .WithRedisConnection("localhost:6379")
        .Build())
    .Build();
