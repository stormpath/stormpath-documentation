sms_factor = account.factors.create({
    'phone': {'number': '+12223334444'},
    'challenge': {'message': 'For the sake of example, your code is ${code}'},
    'type': 'SMS'},
    challenge=True
)
