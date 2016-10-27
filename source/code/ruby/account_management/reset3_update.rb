reset_password_account = application.verify_password_reset_token(password_reset_token)
reset_password_account.password = new_password
reset_password_account.save

login_request = Stormpath::Authentication::UsernamePasswordRequest.new(account.username, new_password)

authentication_result = application.authenticate_account(login_request)
