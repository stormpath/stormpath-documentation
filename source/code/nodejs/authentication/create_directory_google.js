var googleDirectory = {
  name : 'my-google-directory',
  description : 'A Google directory',
  provider: {
    providerId: 'google',
    clientId: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    redirectUri: 'YOUR_GOOGLE_REDIRECT_URI'
  }
};

client.createDirectory(googleDirectory, function (err, directory) {
  if (err) {
    return console.error(err);
  }

  console.log('Google directory created!');
});