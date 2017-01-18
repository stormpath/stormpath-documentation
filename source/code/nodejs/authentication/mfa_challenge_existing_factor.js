var smsFactor; // An smsFactor, fetched from account.getFactors();

var challenge = { // An optional challenge object
  message: "For the sake of example, your code is ${code}"
};

smsFactor.createChallenge(challenge, function(err, createdChallenge) {
  if (err) {
    return console.log(err);
  }

  console.log(createdChallenge);
});
