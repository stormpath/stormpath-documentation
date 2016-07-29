from stormpath.resources import Provider

directory = client.directories.create({
    'name': 'Facebook Directory',
    'provider': {
        'client_id': 'xxx',
        'client_secret': 'xxx',
        'provider_id': Provider.FACEBOOK,
    }
})
