//Currently there are no specific API methods to do search in the Java SDK.
//Still, you can leverege regular query params to use custom data search.
Map<String, Object> queryParams = new HashMap<String, Object>();
queryParams.put("customData.startDate", "[2012,2015]");
AccountList accounts = directory.getAccounts(queryParams);
