// In order to get all Factors
FactorList factors = account.getFactors();

Map<String,String> parameters = new HashMap<>(1);

// In order to get SmsFactor
parameters.put("type", "sms");
FactorList factors = account.getFactors(parameters);

// In order to get GoogleAuthenticatorFactor
parameters.put("type", "google-authenticator");
FactorList factors = account.getFactors(parameters);