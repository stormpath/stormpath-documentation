from stormpath.resources import Provider

directory = client.directories.create({
    'name': 'LinkedIn Directory',
    'provider': {
        'client_id': 'xxx',
        'client_secret': 'xxx',
        'provider_id': Provider.LINKEDIN,
    }
})
