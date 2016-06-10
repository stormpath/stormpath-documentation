Dim requestDescriptor = HttpRequests.NewRequestDescriptor() _
    .WithMethod("GET") _
    .WithUri("incoming_uri") _
    .Build()

Dim idSiteListener = app.NewIdSiteAsyncCallbackHandler(requestDescriptor)

Dim accountResult = Await idSiteListener.GetAccountResultAsync()
