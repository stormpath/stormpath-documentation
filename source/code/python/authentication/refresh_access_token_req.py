from stormpath.api_auth import RefreshGrantAuthenticator

authenticator = RefreshGrantAuthenticator(app=application)
result = authenticator.authenticate(refresh_token)
new_access_token = result.access_token
