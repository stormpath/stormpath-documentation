login_request = Stormpath::Authentication::UsernamePasswordRequest.new(account_username,
                                                                       account_password,
                                                                       account_store: organization)
authentication_result = application.authenticate_account(login_request)
authentication_result.account
