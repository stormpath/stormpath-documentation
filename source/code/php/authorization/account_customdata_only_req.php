$account = \Stormpath\Resource\Account::get(
    $accountHref,
    ['expand'=>'customData']
);

$account->customData;