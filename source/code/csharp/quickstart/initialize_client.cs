var myApiKey = ClientApiKeys.Builder()
    .SetFileLocation("path\\to\\apiKey.properties")
    .Build();

var client = Clients.Builder()
    .SetApiKey(myApiKey)
    .Build();
