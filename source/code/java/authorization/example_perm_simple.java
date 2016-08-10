import com.stormpath.sdk.directory;

CustomData customData = account.getCustomData()

customData.put("create_admin", true);
customData.save();
