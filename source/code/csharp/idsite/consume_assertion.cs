var requestDescriptor = HttpRequests.NewRequestDescriptor()
    .WithMethod("GET")
    .WithUri("incoming_uri")
    .Build();

var idSiteListener = app.NewIdSiteAsyncCallbackHandler(requestDescriptor);

var accountResult = await idSiteListener.GetAccountResultAsync();
