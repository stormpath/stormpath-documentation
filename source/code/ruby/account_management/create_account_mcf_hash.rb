account_data = {
  username: 'jlucpicard',
  email: 'captain@enterprise.com',
  given_name: 'Jean-Luc',
  surname: 'Picard',
  password: '$stormpath2$MD5$1$OGYyMmM5YzVlMDEwODEwZTg3MzM4ZTA2YjljZjMxYmE=$EuFAr2NTM83PrizVAYuOvw=='
}

account = directory.accounts.create(account_data, password_format: 'mcf')
