from stormpath.cache.redis_store import RedisStore
from stormpath.client import Client

client = Client(id='xxx', secret='xxx', cache_options={
    'store': RedisStore,
    'store_opts': {
        'host': 'localhost',
        'port': 6739,
    },
    'ttl': 300,
    'tti': 300,
})
