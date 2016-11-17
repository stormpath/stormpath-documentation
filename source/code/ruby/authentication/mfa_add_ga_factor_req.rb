factor = account.create_factor(:google_authenticator,
                               custom_options: {
                                 account_name: 'stormpath-google-authenticator',
                                 issuer: 'ACME',
                                 status: 'ENABLED'
                               })
