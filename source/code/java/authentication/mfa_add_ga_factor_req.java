GoogleAuthenticatorFactor factor = client.instantiate(GoogleAuthenticatorFactor.class);
factor.setAccountName("myAccountName");
factor.setAccountName("myEnterpriseIssuer");
factor = account.createFactor(factor);