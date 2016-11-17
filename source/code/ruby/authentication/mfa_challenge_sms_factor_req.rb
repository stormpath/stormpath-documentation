challenge = factor.challenges.create(message: 'Please enter the code: ${code}')

# or if you want to use the default message

challenge = factor.challenges.create({})
