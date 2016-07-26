from stormpath.resources import Provider

account = application.accounts.create({
    'provider_data': {
        'provider_id': Provider.GITHUB,
        'access_token': 'xxx',
    }
})
