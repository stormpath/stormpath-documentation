// With a reference to an IDirectory:
var newMapping = await bankOfAOrg.AddAccountStoreAsync(existingDirectory);

// Or simply by href:
newMapping = await bankOfAOrg.AddAccountStoreAsync("directory_href");
