$tenant = $client->getCurrentTenant();

$org = \Stormpath\Resource\Organization::instantiate([
'name' => 'Bank of A',
'nameKey' => 'bank-of-a',
'status' => \Stormpath\Stormpath::ENABLED
]);

$tenant->createOrganization($org);