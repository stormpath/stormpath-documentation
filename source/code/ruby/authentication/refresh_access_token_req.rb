request = Stormpath::Oauth::RefreshGrantRequest.new(refresh_token)
result = application.authenticate_oauth(request)
access_token = result.access_token
