$account = \Stormpath\Resource\Account::instantiate(
  array('givenName' => 'John',
        'surname' => 'Smith',
        'username' => 'johnsmith',
        'email' => 'john.smith@example.com',
        'password' => '4P@$$w0rd!'));

$application->createAccount($account);