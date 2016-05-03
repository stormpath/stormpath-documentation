$token = Stormpath\Resource\AccessToken::get($tokenHref);
$token->delete();