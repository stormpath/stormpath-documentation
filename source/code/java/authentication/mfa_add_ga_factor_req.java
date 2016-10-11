GoogleAuthenticatorFactor factor = client.instantiate(GoogleAuthenticatorFactor.class);
factor.accountName = "myAccountName";
factor.issuer = "myEnterpriseIssuer";
factor = account.createFactor(factor);