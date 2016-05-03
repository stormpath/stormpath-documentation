$provider = $client->dataStore->instantiate(\Stormpath\Stormpath::GOOGLE_PROVIDER);
$provider->clientId = "857385-m8vk0fn2r7jmjo.apps.googleusercontent.com";
$provider->clientSecret = "ehs7_-bA7OWQSQ4";
$provider->redirectUri = "https://myapplication.com/authenticate";

$directory = $client->dataStore->instantiate(\Stormpath\Stormpath::DIRECTORY);
$directory->name = "my-google-directory";
$directory->description = "A Google directory";
$directory->provider = $provider;

$tenant = $client->getCurrentTenant();
$directory = $tenant->createDirectory($directory);