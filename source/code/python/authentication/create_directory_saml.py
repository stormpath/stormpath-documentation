from stormpath.resources import Provider

client.directories.create({
    'name': 'My SAML Directory',
    'description': 'A Directory used for SAML Authorization',
    'provider': {
        'provider_id': Provider.SAML,
        'sso_login_url': 'https://example.com/saml2/sso/login',
        'sso_logout_url': 'https://example.com/saml2/sso/logout',
        'encoded_x509_signing_cert': '-----BEGIN CERTIFICATE-----\n...Certificate goes here...\n-----END CERTIFICATE-----',
        'request_signature_algorithm': Provider.SIGNING_ALGORITHM_RSA_SHA_256,
    },
})
