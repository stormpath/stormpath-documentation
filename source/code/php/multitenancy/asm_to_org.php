$group = \Stormpath\Resource\Group::get('https://api.stormpath.com/v1/groups/47RoLyCPAgzWDk5F1wevFI');

$org = \Stormpath\Resource\Organization::get('https://api.stormpath.com/v1/organizations/4uGaK0hpXmPActPZbH4nYN');

$asm = \Stormpath\Resource\AccountStoreMapping::instantiate([
    'organization' => $org,
    'accountStore' =>$group
]);

$org->createOrganizationAccountStoreMapping($asm);