$provider = $client->dataStore->instantiate(\Stormpath\Stormpath::SAML_PROVIDER);
$provider->ssoLoginUrl = "http://provider.com/login";
$provider->ssoLogoutUrl = "http://provider.com/logout";
$provider->encodedX509SigningCert = '-----BEGIN CERTIFICATE-----\nMIIDX...tUJ+dp8aJnprxyB\nnQ==\n-----END CERTIFICATE-----';
$provider->requestSignatureAlgorithm = 'RSA-SHA1';

$directory = $client->dataStore->instantiate(\Stormpath\Stormpath::DIRECTORY);
$directory->name = "my-saml-directory";
$directory->description = "A Saml directory";
$directory->provider = $provider;

$tenant = $client->getCurrentTenant();
$directory = $tenant->createDirectory($directory);

