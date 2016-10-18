expansion = Stormpath::Resource::Expansion.new('customData')
account = client.accounts.get(account_href, expansion)
