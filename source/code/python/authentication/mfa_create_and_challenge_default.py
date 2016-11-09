sms_factor = account.factors.create({
    'phone': {'number': '+12223334444'},
    'type': 'SMS'})
challenge = sms_factor.most_recent_challenge
