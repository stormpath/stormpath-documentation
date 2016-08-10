import com.stormpath.sdk.directory;
import java.util.*;

CustomData customData = account.getCustomData()

Map<String, String> permission = new HashMap<String, String>();

permission.put("name", "create-admin");
permission.put("description", "This permission allows the account to create an admin");
permission.put("action", "write");
permission.put("resource", "/admin/create");
permission.put("effect", "allow");

customData.put("permissions", new Map[]{permission});
customData.save();
