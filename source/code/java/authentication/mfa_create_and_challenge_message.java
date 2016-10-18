Phone phone = client.instantiate(Phone);
phone = phone.setNumber("267-555-5555");
SmsFactor factor = client.instantiate(SmsFactor);
factor = factor.setPhone(phone);
SmsChallenge challenge = client.instantiate(SmsChallenge);
challenge.setMessage("Welcome to the Example! Your authorization code is ${code}");
challenge = factor.createChallenge(challenge);