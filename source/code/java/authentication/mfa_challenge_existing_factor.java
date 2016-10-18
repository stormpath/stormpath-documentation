Challenge challenge = client.instantiate(SmsChallenge.class);
// Setting a message is optional, only if you want to overwrite the default message.
challenge.setMessage("For the sake of example, your code is ${code}");
challenge = factors.iterator().next().createChallenge(challenge);