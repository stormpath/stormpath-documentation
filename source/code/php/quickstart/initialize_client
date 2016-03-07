\Stormpath\Client::$apiKeyFileLocation = '/PATH/TO/.stormpath/apiKey.properties';

$client = \Stormpath\Client::getInstance();

// OR

\Stormpath\Client::$apiKeyProperties = "apiKey.id={{API KEY ID}}\napiKey.secret={{API KEY SECRET}}";

$client = \Stormpath\Client::getInstance();

// OR

$builder = new \Stormpath\ClientBuilder();
$client = $builder->setApiKeyFileLocation($apiKeyFileLocation)->build();