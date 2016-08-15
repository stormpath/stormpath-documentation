LocalDate localDate = LocalDate.of(2015, 12, 1);
Date midnightUTC = Date.from(localDate.atStartOfDay(ZoneOffset.UTC).toInstant());
AccountList accounts = application.getAccounts(Accounts.where(
    Accounts.modifiedAt().in(midnightUTC, new Duration(24, TimeUnit.HOURS))
));
