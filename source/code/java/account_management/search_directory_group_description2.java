GroupList groupsInUSEast = myDirectory.getGroups(
    Groups.where(
        Groups.description().containsIgnoreCase("/US East")
    )
);
