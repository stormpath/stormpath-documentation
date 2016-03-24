Dim officersGroup = client.Instantiate(Of IGroup)() _
    .SetName("Starfleet Officers") _
    .SetDescription("Commissioned officers in Starfleet") _
    .SetStatus(GroupStatus.Disabled)
Await captainsDirectory.CreateGroupAsync(officersGroup)
