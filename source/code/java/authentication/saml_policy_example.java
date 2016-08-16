SamlPolicy policy = application.getSamlPolicy();

SamlServiceProvider servicePovider = policy.getSamlServiceProvider();
// servicePovider.getHref() is the SAML Service Provider URL

SsoInitiationEndpoint ssoInitiationEndpoint = servicePovider.getSsoInitiationEndpoint();
// ssoInitiationEndpoint.getHref() is the SSO Initiation Endpoint
