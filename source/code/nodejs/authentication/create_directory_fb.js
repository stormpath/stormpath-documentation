var facebookDirectory = {
  name : 'my-facebook-directory',
  description : 'A Facebook directory',
  provider: {
    providerId: 'facebook',
    clientId: 'YOUR_FACEBOOK_APP_ID',
    clientSecret: 'YOUR_FACEBOOK_APP_SECRET'
  }
};

client.createDirectory(facebookDirectory, function (err, directory) {
  if (err) {
    return console.error(err);
  }

  console.log('Facebook directory created!');
});