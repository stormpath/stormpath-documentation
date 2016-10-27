request = Stormpath::Provider::AccountRequest.new(:linkedin, :access_token, access_token)
account = application.get_provider_account(request).account
