Phone phone = client.instantiate(Phone);
phone = phone.setNumber("267-555-5555");
SmsFactor factor = client.instantiate(SmsFactor);
factor = factor.setPhone(phone);
CreateSmsFactorRequestBuilder builder = Factors.SMS.newCreateRequestFor(factor).createChallenge();
factor = account.createFactor(builder.build());