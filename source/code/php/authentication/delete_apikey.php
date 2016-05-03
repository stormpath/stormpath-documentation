$apiKey = $client->dataStore->getResource(
                                  'https://api.stormpath.com/v1/apiKeys/FJATLPHN4...ZHY3VGESX',
                                  \Stormpath\Stormpath::API_KEY
                              );

$apiKey->delete();