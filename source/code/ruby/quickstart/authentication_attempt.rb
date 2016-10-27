auth_request = Stormpath::Authentication::UsernamePasswordRequest.new('johnsmith', '4P@$$w0rd!')

begin
  auth_result = application.authenticate_account(auth_request)
  account = auth_result.account
rescue Stormpath::Error => e
  # If credentials are invalid or account doesn't exist
end
