// In order to get all Factors
FactorList factors = account.getFactors();

Map<String,String> parameters = new HashMap<>(1);

// In order to get SmsFactor
parameters.put("type", "sms");
FactorList factors = account.getFactors(parameters);
// or
FactorList factors = account.getFactors(Factors.SMS.criteria());


// In order to get GoogleAuthenticatorFactor
parameters.put("type", "google-authenticator");
FactorList factors = account.getFactors(parameters);
// or
FactorList factors = account.getFactors(Factors.GOOGLE_AUTHENTICATOR.criteria());