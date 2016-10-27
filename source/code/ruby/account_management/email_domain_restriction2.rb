whitelisted = ['*site.com', '*stormpath.com']
account_creation_policy = directory.account_creation_policy

account_creation_policy.email_domain_whitelist = whitelisted

account_creation_policy.save
