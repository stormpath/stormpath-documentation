var directory; // A Directory object, fetched from Client.getDirectory();

directory.getAccountSchema(function (err, schema) {
  if (err) {
    return console.error(err);
  }

  console.log(schema);
});
