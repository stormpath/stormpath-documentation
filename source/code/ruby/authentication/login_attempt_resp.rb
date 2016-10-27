request = Stormpath::Authentication::UsernamePasswordRequest.new('han@millenniumfalcon.com', 'SuperP4ss!')

begin
  result = application.authenticate_account(request)
  account = result.account
rescue Stormpath::Error => e
  # If credentials are invalid or account doesn't exist
end
