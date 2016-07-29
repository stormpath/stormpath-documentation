from stormpath.client import Client

client = Client(id='xxx', secret='xxx', proxies={
    'http': 'http://10.10.1.10:3128',
    'https': 'http://10.10.1.10:1080',
})
