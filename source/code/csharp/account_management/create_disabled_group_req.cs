var officersGroup = client.Instantiate<IGroup>()
    .SetName("Starfleet Officers")
    .SetDescription("Commissioned officers in Starfleet")
    .SetStatus(GroupStatus.Disabled);
await captainsDirectory.CreateGroupAsync(officersGroup);
