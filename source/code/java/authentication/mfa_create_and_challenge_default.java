CreateSmsFactorRequestBuilder builder = Factors.SMS.newCreateRequestFor(factor).createChallenge();
factor = account.createFactor(builder.build());