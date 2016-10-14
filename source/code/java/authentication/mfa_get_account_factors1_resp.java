// In order to get all Factors
FactorList factors = account.getFactors();

// Factors can be filtered by type. To retrieve only the Sms Factors you can do:
Map<String,Object> parameters = new HashMap<>(1);
parameters.put("type", "sms");
factors = account.getFactors(parameters);

// or
factors = account.getFactors(Factors.SMS.criteria());

// To retrieve only the Google Authenticator Factors you can do:
parameters.put("type", "google-authenticator");
factors = account.getFactors(parameters);

// or
factors = account.getFactors(Factors.GOOGLE_AUTHENTICATOR.criteria());