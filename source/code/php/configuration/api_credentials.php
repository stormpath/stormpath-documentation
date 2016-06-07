$apiKeyProperties = "apiKey.id=APIKEYID\napiKey.secret=APIKEYSECRET";
$builder = new \Stormpath\ClientBuilder();
$client = $builder->setApiKeyProperties($apiKeyProperties)->build();
