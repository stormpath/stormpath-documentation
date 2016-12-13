var challenge; // A previously fetched Challenge object

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
