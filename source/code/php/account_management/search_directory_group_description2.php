$directory = \Stormpath\Resource\Directory::get('https://api.stormpath.com/v1/directories/2bofMIN0rJlxgefvFYloQz');

$directories = $directory->groups->setSearch(['description'=>'US East']);