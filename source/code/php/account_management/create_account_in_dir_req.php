$account = \Stormpath\Resource\Account::instantiate([
    'username' => 'jlpicard',
    'givenName' => 'Jean-Luc',
    'surname' => 'Picard',
    'email' => 'capt@enterprise.com',
    'password' => 'uGhd%a8Kl!'
]);

$account = $directory->createAccount($account);
