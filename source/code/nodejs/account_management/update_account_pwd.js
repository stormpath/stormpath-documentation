account.password = 'some_New+Value1234';

account.save(function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Account password changed!');
});