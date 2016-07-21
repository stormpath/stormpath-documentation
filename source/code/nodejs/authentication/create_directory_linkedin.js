var linkedInDirectory = {
  name : 'my-linkedin-directory',
  description : 'A LinkedIn directory',
  provider: {
    providerId: 'linkedin',
    clientId: 'YOUR_LINKEDIN_APP_ID',
    clientSecret: 'YOUR_LINKEDIN_APP_SECRET'
  }
};

client.createDirectory(linkedInDirectory, function (err, directory) {
  if (err) {
    return console.error(err);
  }

  console.log('LinkedIn directory created!');
});