$oauthPolicy = $application->oAuthPolicy;

$oauthPolicy->accessTokenTtl = 'PT30M';
$oauthPolicy->save();

