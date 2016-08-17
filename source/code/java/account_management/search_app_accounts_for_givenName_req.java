AccountList accounts = application.getAccounts(
    Accounts.where(Accounts.givenName().containsIgnoreCase("Luc"))
);
