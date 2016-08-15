AccountList accounts = application.getAccounts(Accounts.where(
        Accounts.modifiedAt().matches("[2016-08-14T20:00:00.000Z, 2016-08-14T23:59:59.999Z]")
));
