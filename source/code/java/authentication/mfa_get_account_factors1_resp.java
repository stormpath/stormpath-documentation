// In order to get all Factors
FactorList factors = account.getFactors();

// In order to get SmsFactor
Map<String,Object> parameters = new HashMap<>(1);
parameters.put("type", "sms");
factors = account.getFactors(parameters);
// or
factors = account.getFactors(Factors.SMS.criteria());

// In order to get GoogleAuthenticatorFactor
parameters.put("type", "google-authenticator");
factors = account.getFactors(parameters);
// or
factors = account.getFactors(Factors.GOOGLE_AUTHENTICATOR.criteria());