var gitHubDirectory = {
  name : 'my-github-directory',
  description : 'A GitHub directory',
  provider: {
    providerId: 'github',
    clientId: 'YOUR_GITHUB_CLIENT_ID',
    clientSecret: 'YOUR_GITHUB_CLIENT_SECRET'
  }
};

client.createDirectory(gitHubDirectory, function (err, directory) {
  if (err) {
    return console.error(err);
  }

  console.log('GitHub directory created!');
});