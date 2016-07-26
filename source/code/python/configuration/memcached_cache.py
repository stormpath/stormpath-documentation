from stormpath.cache.memcached_store import MemcachedStore
from stormpath.client import Client

client = Client(id='xxx', secret='xxx', cache_options={
    'store': MemcachedStore,
    'store_opts': {
        'host': 'localhost',
        'port': 11211,
    },
    'ttl': 300,
    'tti': 300,
})
