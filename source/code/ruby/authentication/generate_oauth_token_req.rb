grant_request = Stormpath::Oauth::PasswordGrantRequest.new('han@millenniumfalcon.com', 'SuperP4ss!')
response = application.authenticate_oauth(grant_request)
