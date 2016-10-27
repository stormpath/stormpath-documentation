request = Stormpath::Authentication::UsernamePasswordRequest.new('han@millenniumfalcon.com', 'SuperP4ss!')
result = application.authenticate_account(request)
