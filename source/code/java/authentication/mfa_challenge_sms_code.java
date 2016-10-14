String href = challenge.getHref();
String code = "633559";
Challenge challenge = client.getResource(href, SmsChallenge);
boolean challengeValidated = challenge.validate(code);
// Load the challenge one more time to ensure retrieving latest status value.
challenge = client.getResource(href, SmsChallenge);
SmsChallengeStatus status = challenge.getStatus(); //The value should be SUCCESS