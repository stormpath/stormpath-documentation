  String usernameOrEmail = "tk421@stormpath.com";
  String rawPassword = "Changeme1";

  // Create an authentication request using the credentials
  AuthenticationRequest request = UsernamePasswordRequest.builder()
      .setUsernameOrEmail(usernameOrEmail)
      .setPassword(rawPassword)
      .build();

  //Now let's authenticate the account with the application:
  try {
      AuthenticationResult result = application.authenticateAccount(request);
      account = result.getAccount();
      System.out.println(
          "Authenticated Account: " + account.getUsername() + ", " +
          "Email: " + account.getEmail()
      );
  } catch (ResourceException ex) {
      log.error(ex.getMessage());
  }
