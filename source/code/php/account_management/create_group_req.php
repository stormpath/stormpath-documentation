$group = $client
            ->dataStore
            ->instantiate(\Stormpath\Resource\Group::class);

$group->name = 'Leaders';
$group->description = 'Galactic Senate Leaders';
$group = $directory->createGroup($group);