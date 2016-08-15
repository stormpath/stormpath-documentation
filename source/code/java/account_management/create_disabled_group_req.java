Group officersGroup = client.instantiate(Group.class)
    .setName("Starfleet Officers")
    .setDescription("Commissioned officers in Starfleet")
    .setStatus(GroupStatus.DISABLED);

captainsDirectory.createGroup(officersGroup);
