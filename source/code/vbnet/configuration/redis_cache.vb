Dim client = Clients.Builder() _
    .SetCacheProvider(CacheProviders.Create().RedisCache() _
        .WithRedisConnection("localhost:6379") _
        .Build()) _
    .Build()
