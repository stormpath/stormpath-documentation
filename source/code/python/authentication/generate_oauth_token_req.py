from stormpath.api_auth import PasswordGrantAuthenticator

authenticator = PasswordGrantAuthenticator(app=application)
result = authenticator.authenticate('han@millenniumfalcon.com', 'SuperP4ss!')
