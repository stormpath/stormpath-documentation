from stormpath.api_auth import OAuthRequestAuthenticator

authenticator = OAuthRequestAuthenticator(app=application)
result = authenticator.authenticate(headers={'Authorization': 'Bearer xxx'})
