if application.verify_password_reset_token(token)
  # The token is valid!
else
  # Too bad! Not valid!
end
