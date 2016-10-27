request = Stormpath::Provider::AccountRequest.new(:linkedin, :code, code)
account = application.get_provider_account(request).account
