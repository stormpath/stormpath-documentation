account.getAccessTokens(function (er, accessTokenCollection) {

  if (err) {
    return console.error(err);
  }

  accessTokenCollection.each(function(accessToken, next){
    accessToken.delete(next);
  }, function done(err) {
    if (err) {
      return console.error(err);
    }

    console.log('All access tokens have been deleted');
  });
});
