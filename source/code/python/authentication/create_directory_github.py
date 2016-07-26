from stormpath.resources import Provider

directory = client.directories.create({
    'name': 'Github Directory',
    'provider': {
        'client_id': 'xxx',
        'client_secret': 'xxx',
        'provider_id': Provider.GITHUB,
    }
})
