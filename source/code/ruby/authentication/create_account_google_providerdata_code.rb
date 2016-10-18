request = Stormpath::Provider::AccountRequest.new(:google, :code, code)
account = application.get_provider_account(request).account
