directory = client.directories.create({
    'name': 'test_dir',
    'description': 'This is a testing directory.'
})
account = directory.accounts.create({
    'username': 'john_smith',
    'given_name': 'John',
    'surname': 'Smith',
    'email': 'john_smith@example.com',
    'password': 'MynameissmithJohnsmith1'
})
