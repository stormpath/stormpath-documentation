account = application.accounts.create({
    'given_name': 'Joe',
    'surname': 'Stormtrooper',
    'email': 'tk421@galacticempire.co',
    'password': 'Changeme123!',
})
print('User ' + account.full_name + ' created.')
