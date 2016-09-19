var authenticator = new stormpath.JwtAuthenticator(application);

authenticator.withLocalValidation();