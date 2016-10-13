Schema schema = directory.getAccountSchema();

for (Field field : fields) {
  if ("surname".equals(field.getName())) {
    field.setRequired(true);
    field.save();
  }
}
