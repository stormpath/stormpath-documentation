$provider = $client->dataStore->instantiate(\Stormpath\Stormpath::GITHUB_PROVIDER);
$provider->clientId = "48f983a65887df76";
$provider->clientSecret = "2b5476584adf7846f890094cba3672f7";

$directory = $client->dataStore->instantiate(\Stormpath\Stormpath::DIRECTORY);
$directory->name = "my-github-directory";
$directory->description = "A Github directory";
$directory->provider = $provider;

$tenant = $client->getCurrentTenant();
$directory = $tenant->createDirectory($directory);