var samlDirectory = {
  name : 'My SAML Directory',
  description: 'A Directory used for SAML Authorization',
  provider: {
    providerId: 'saml',
    ssoLoginUrl: 'https://yourIdp.com/saml2/sso/login',
    ssoLogoutUrl: 'https://yourIdp.com/saml2/sso/logout',
    encodedX509SigningCert: '-----BEGIN CERTIFICATE-----\n...Certificate goes here...\n-----END CERTIFICATE-----',
    requestSignatureAlgorithm: 'RSA-SHA256'
  }
};

client.createDirectory(samlDirectory, function (err, directory) {
  if (err) {
    return console.error(err);
  }

  console.log('SAML directory created!');
});