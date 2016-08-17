application.sendVerificationEmail(Applications.verificationEmailBuilder()
    .setAccountStore(captainsDirectory)
    .setLogin(picard.getEmail())
    .build()
);
