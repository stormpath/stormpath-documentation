import com.stormpath.sdk.directory;

CustomData customData = account.getCustomData();
customData.put("https://api.stormpath.com/v1/accounts/3fLduLKlEx");
customData.save();
