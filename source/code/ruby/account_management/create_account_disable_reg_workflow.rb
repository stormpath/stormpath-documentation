account = Stormpath::Resource::Account.new(
  email: random_email,
  given_name: 'Ruby SDK',
  password: 'P@$$w0rd',
  surname: 'SDK',
  username: random_user_name
)

account = directory.create_account(account, registration_workflow_enabled = false)
