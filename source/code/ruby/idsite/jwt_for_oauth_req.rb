request = Stormpath::Oauth::IdSiteGrantRequest.new(jwt_response)
response = application.authenticate_oauth(request)
