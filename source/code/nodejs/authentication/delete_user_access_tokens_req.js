accessTokenToDelete.delete(function (err) {
  if (err) {
    return console.error(err);
  }

  refreshTokenToDelete.delete(function (err) {
    if (err) {
      return console.error(err);
    }

    console.log('Access and refresh tokens deleted!');
  });
});