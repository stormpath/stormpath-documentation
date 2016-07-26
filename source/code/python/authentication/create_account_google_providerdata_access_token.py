from stormpath.resources import Provider

account = application.accounts.create({
    'provider_data': {
        'provider_id': Provider.GOOGLE,
        'access_token': 'xxx',
    }
})
