Directory captainsDirectory = client.instantiate(Directory.class)
    .setName("Captains")
    .setDescription("All the Captains");

client.createDirectory(captainsDirectory);
