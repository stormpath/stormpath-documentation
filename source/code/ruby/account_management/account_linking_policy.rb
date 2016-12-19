application = client.applications.get(application_href)

account_linking_policy = application.account_linking_policy

account_linking_policy.status = 'ENABLED'
account_linking_policy.save

# You can also enable an Organization's Account Linking Policy

organization = client.organizations.get(organization_href)

account_linking_policy = organization.account_linking_policy

account_linking_policy.status = 'ENABLED'
account_linking_policy.save
