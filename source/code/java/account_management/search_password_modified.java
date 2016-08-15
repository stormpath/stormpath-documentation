Map<String, Object> queryParams = new HashMap<>();
queryParams.put("passwordModifiedAt", "[,2016)");
accounts = myDirectory.getAccounts(queryParams);
