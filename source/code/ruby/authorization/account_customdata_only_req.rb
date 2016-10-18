expansion = Stormpath::Resource::Expansion.new('customData')
custom_data = client.accounts.get(account_href, expansion).custom_data
