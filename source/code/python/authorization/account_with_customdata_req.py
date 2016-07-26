from stormpath.resources import Expansion

expansion = Expansion()
expansion.add_property('customData')

account = client.accounts.get(account_href, expansion)
