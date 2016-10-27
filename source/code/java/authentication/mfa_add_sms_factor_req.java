Phone phone = client.instantiate(Phone.class);
phone = phone.setNumber("+1-888-777-8888");
SmsFactor factor = client.instantiate(SmsFactor.class);
factor = factor.setPhone(phone);
factor = account.createFactor(factor);