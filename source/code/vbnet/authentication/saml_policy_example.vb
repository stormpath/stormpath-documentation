Dim samlPolicy = Await app.GetSamlPolicyAsync()

Dim samlServiceProvider = Await samlPolicy.GetSamlServiceProviderAsync()
' samlServiceProvider.Href is the SAML Service Provider URL

Dim ssoInitiationEndpoint = Await samlServiceProvider.GetSsoInitiationEndpointAsync()
' ssoInitiationEndpoint.Href is the SSO Initiation Endpoint
