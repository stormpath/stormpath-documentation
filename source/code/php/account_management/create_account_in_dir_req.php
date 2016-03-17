$account = \Stormpath\Resource\Account::instantiate([
    'givenName' => 'Sheev',
    'surname' => 'Palpatine',
    'email' => 'Sheev.Palpatine@galacticempire.com',
    'password' => 'Sup3rP4ssw0rd!'
]);

$account = $directory->createAccount($account);
