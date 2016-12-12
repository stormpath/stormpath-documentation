var challenge; // A previously fetched Challenge object
var code = '633559'; // The code sent via SMS

challenge.verifyCode(code, function(err, updatedChallenge){
  if (err) {
    // The challenge has expired or has already been verified
    return console.log(err);
  }

  if (updatedChallenge.status === 'FAILED') {
    return console.log('Incorrect code, please try again.');
  }

  // The challenge was successfully verified
  console.log(updatedChallenge.status);
});
