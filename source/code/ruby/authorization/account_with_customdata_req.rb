expansion = Stormpath::Resource::Expansion.new
expansion.add_property('customData')

account = client.accounts.get(account_href, expansion)
