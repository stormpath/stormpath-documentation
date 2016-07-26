from stormpath.resources import Provider

account = application.accounts.create({
    'provider_data': {
        'provider_id': Provider.FACEBOOK,
        'access_token': 'xxx',
    }
})
