directory = client.directories.create(
  name: random_directory_name,
  description: 'description_for_some_test_directory',
  provider: {
    provider_id: 'saml ',
    sso_login_url: 'https://yourIdp.com/saml2/sso/login',
    sso_logout_url: 'https://yourIdp.com/saml2/sso/logout',
    encoded_x509_signing_cert: '-----BEGIN CERTIFICATE-----\n...Certificate goes here...\n-----END CERTIFICATE----- ',
    request_signature_algorithm: 'RSA-SHA256'
  }
)
