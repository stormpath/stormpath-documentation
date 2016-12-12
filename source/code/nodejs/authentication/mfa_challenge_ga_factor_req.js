var challenge; // A previously fetched Challenge object
var code = '786393'; // The code extracted from the Google Authenticator QR code 

challenge.verifyCode('786393', function(err, updatedChallenge){
  if (err) {
    // The challenge has expired or has already been verified
    return console.log(err);
  }

  if (updatedChallenge.status === 'FAILED') {
    return console.log('Incorrect code, please try again.');
  }

  // The challenge was successful!
  console.log(updatedChallenge.status);
});
