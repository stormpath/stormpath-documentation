GoogleAuthenticatorFactor factor = client.instantiate(GoogleAuthenticatorFactor.class);
factor.setAccountName("myAccountName")
      .setIssuer("myEnterpriseIssuer");
factor = account.createFactor(factor);