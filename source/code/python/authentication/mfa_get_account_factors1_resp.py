# In order to get all Factors
factors = account.factors

# Factors can be filtered by type. To retrieve only the Sms Factors you can do:
sms_factors = account.factors.search({'type': 'sms'})

# To retrieve only the Google Authenticator Factors you can do:
google_factors = account.factors.search({'type': 'google-authenticator'})
