accounts = application.getAccounts(
    Accounts.where(Accounts.status().eq(AccountStatus.DISABLED))
);
