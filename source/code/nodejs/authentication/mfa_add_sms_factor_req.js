var factor = {
  type: 'sms',
  phone: {
    number: '+12675555555'
  }
};

var account; // A previously fetched Account object

account.createFactor(factor, function(err, smsFactor) {
  if (err) {
    return console.log(err);
  }

  console.log(smsFactor);
});
