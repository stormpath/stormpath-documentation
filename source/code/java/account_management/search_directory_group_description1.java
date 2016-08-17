GroupList groupsInUS = myDirectory.getGroups(
    Groups.where(
        Groups.description().containsIgnoreCase("/US")
    )
);
