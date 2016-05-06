var samlPolicy = await app.GetSamlPolicyAsync();

var samlServiceProvider = await samlPolicy.GetSamlServiceProviderAsync();
// samlServiceProvider.Href is the SAML Service Provider URL

var ssoInitiationEndpoint = await samlServiceProvider.GetSsoInitiationEndpointAsync();
// ssoInitiationEndpoint.Href is the SSO Initiation Endpoint
