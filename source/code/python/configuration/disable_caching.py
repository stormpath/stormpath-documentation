from stormpath.cache.null_cache_store import NullCacheStore
from stormpath.client import Client

client = Client(id='xxx', secret='yyy', cache_options={'store': NullCacheStore})
