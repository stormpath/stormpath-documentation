# We're assuming that the provided account only has one sms factor.
factor = account.factors.search({'type': 'sms'})[0]
