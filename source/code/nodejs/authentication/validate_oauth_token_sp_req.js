var accessToken = 'eyJraWQiOiI2NldURFJVM1paSkNZVFJVVlZTUUw3WEJOIiwic3R0IjoiYWNjZXNzIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiI3YnRSVUs3alczRFFuNTJyV25oT0VYIiwiaWF0IjoxNDc0MDUwNzcyLCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8yNGs3SG5ET3o0dFE5QVJzQnRQVU42Iiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy81dThCWVp0dTA5czN5ZDFYdERZUlNvIiwiZXhwIjoxNDc0MDUxMzcyLCJydGkiOiI3YnRSVUduZWJTdVNBRngwS1hxN2NUIn0.tNDXCaIWrYZx7s6SjsXW4g85gnlpPJrz8TAmP43G3DU'

authenticator.authenticate(accessToken, function (err, authResult) {
  if (err) {
    return console.error(err); // Token was not valid
  }

  authResult.getAccount(function (err, account) {
    if (err) {
      return console.error(err);
    }

    console.log('Account ' + account.email + ' has authenticated with an access token');
  });
});