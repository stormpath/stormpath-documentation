' With a reference to an IDirectory:
Dim newMapping = Await bankOfAOrg.AddAccountStoreAsync(existingDirectory)

' Or simply by href:
newMapping = Await bankOfAOrg.AddAccountStoreAsync("directory_href")
