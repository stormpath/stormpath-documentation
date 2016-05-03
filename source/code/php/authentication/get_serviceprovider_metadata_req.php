$providerHref = $directory->provider->href;

$provider = $client->dataStore->getResource($providerHref, \Stormpath\Stormpath::SAML_PROVIDER);

$providerMetaData = $provider->serviceProviderMetadata;
