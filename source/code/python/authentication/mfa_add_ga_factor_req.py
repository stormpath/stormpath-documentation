google_factor = account.factors.create({
    'type': 'google-authenticator',
    'accountName': 'example@stormpath.com',
    'issuer': 'myEnterpriseIssuer'
})
