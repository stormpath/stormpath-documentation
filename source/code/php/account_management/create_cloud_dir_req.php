$tenant = $client->getCurrentTenant();

$directory = $client
                ->dataStore
                ->instantiate(\Stormpath\Resource\Directory::class);

$directory->name = 'Captains';
$directory->description = 'Captains from a variety of stories';

$directory = $tenant->createDirectory($directory);