Directory captainsDirectory = client.instantiate(Directory.class);
dir.setName("Captains");
dir.setDescription("Captains from a variety of stories");
dir.setStatus(DirectoryStatus.ENABLED);
captainsDirectory = client.createDirectory(dir);
