whitelisted = ['*gmail.co', '*example.com']
blacklisted = ['*spam.com', '*unehisting.co']
account_creation_policy = directory.account_creation_policy

account_creation_policy.email_domain_whitelist = whitelisted
account_creation_policy.email_domain_blacklist = blacklisted

account_creation_policy.save
