ProviderAccountRequest request = Providers.GOOGLE
    .account()
    .setCode(code)
    .build();

ProviderAccountResult result = application.getAccount(request);
Account account = result.getAccount();
