$tenant = $client->getCurrentTenant();

$directory = $client
                ->dataStore
                ->instantiate(\Stormpath\Resource\Directory::class);

$directory->name = 'Galactic Republic';
$directory->description = 'Keeping Peace Across The Galaxy';

$directory = $tenant->createDirectory($directory);