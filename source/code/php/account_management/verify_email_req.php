$token = {{ SP Token From Query String }}
$tenant = $client->getCurrentTenant();

$tenant->verifyEmailToken($token);