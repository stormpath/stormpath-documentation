$account = $client
                ->dataStore
                ->getResource(
                    'https://api.stormpath.com/v1/accounts/4aOb1hLvLHIB0PWObEnydJ',
                    \Stormpath\Resource\Account::class
                );
$customData = $account->customData;

$customData->officeLocation = "Senate District's executive building";
$customData->holoTerminalNumber = 18573894;
$customData->homeWorld = "Naboo";
$customData->apprentices = ['Darth Maul', 'Darth Tyranus', 'Darth Vader'];

$customData->save();