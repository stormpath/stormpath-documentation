factor = account.create_factor(:sms,
                               phone: { number: '267-555-5555',
                                        name: 'Rspec test phone',
                                        description: 'This is a testing phone number' },
                               challenge: { message: 'Welcome to the Example! Your authorization code is ' })
