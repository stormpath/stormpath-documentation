application = client.applications.get(application_href)

account = application.accounts.create(
  email: 'test123@email.com',
  password: 'APassword1234'
)
