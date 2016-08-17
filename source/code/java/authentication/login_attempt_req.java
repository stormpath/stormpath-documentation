try {
    AuthenticationRequest authenticationRequest = UsernamePasswordRequest
        .builder()
        .setUsernameOrEmail("han@newrepublic.gov")
        .setPassword("first2shoot!")
        .build();
    AuthenticationResult result = application.authenticateAccount(authenticationRequest);

    Account account = result.getAccount();
} catch(IncorrectCredentialsException e) {
    e.printStackTrace();
}
