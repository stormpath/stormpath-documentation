Map<String, Object> queryParams = new HashMap<>();
queryParams.put("q", "Luc");
AccountList accounts = application.getAccounts(queryParams);
