request = Stormpath::Provider::AccountRequest.new(:facebook, :access_token, access_token)
account = application.get_provider_account(request).account
