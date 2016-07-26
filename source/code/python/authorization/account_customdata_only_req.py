from stormpath.resources import Expansion

expansion = Expansion()
expansion.add_property('customData')

custom_data = client.accounts.get(account_href, expansion).custom_data
