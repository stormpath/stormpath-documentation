$group = $client
            ->dataStore
            ->instantiate(\Stormpath\Resource\Group::class);

$group->name = 'Starfleet Officers';
$group->description = 'Commissioned officers in Starfleet';
$group = $directory->createGroup($group);