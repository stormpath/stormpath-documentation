ProviderAccountRequest request = Providers.GOOGLE
    .account()
    .setAccessToken(accessToken)
    .build();

ProviderAccountResult result = application.getAccount(request);
Account account = result.getAccount();
