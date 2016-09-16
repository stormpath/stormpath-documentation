var href = 'https://api.stormpath.com/v1/accessTokens/25hgO2ZiuJHze14GzDtzof';

client.getAccessToken(href, function (err, accessToken) {
  accessToken.delete(function (err) {
    if (err) {
      return console.log(err);
    }

    console.log('Access Token Was Deleted');
  });
});