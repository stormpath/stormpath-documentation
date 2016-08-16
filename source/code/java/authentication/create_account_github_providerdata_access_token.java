ProviderAccountRequest request = Providers.GITHUB
    .account()
    .setAccessToken(accessToken)
    .build();

ProviderAccountResult result = application.getAccount(request);
Account account = result.getAccount();
