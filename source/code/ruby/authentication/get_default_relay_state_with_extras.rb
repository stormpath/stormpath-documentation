drs = application.saml_policy.service_provider.default_relay_states.create(
  callback_uri: 'https://org1.myapp.com',
  organization: {
    name_key: 'org1'
  },
  state: 'iamastate'
)

# This is also possible:
drs = application.saml_policy.service_provider.default_relay_states.create(
    callback_uri: 'https://org1.myapp.com',
    organization: organization,
    state: 'iamastate'
)
