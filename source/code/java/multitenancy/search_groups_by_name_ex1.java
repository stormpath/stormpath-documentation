GroupList roleGroups = myDirectory.getGroups(Groups.where(
    Groups.name().startsWithIgnoreCase("bank-of-a.role.")
));
