from stormpath.api_auth import BasicRequestAuthenticator

authenticator = BasicRequestAuthenticator(app=application)
result = authenticator.authenticate(headers={'Authorization': 'xxx'})
