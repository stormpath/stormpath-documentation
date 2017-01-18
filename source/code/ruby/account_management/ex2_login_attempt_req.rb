request = Stormpath::Provider::AccountRequest.new(:facebook,
                                                  :access_token,
                                                  access_token,
                                                  account_store: { name_key: 'app1' })

account = application.get_provider_account(request).account
