$builder = new \Stormpath\ClientBuilder();
$client = $builder
    ->setAuthenticationScheme(\Stormpath\Stormpath::BASIC_AUTHENTICATION_SCHEME)
    ->build();