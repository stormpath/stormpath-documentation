Dim myApiKey = ClientApiKeys.Builder() _
    .SetFileLocation("path\\to\\apiKey.properties") _
    .Build();

Dim client = Clients.Builder() _
    .SetApiKey(myApiKey) _
    .Build();
