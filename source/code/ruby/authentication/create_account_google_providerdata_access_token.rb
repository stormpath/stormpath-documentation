request = Stormpath::Provider::AccountRequest.new(:google, :access_token, access_token)
account = application.get_provider_account(request).account
