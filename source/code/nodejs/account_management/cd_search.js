directory.getAccounts({
  expand:'customData',
  'customData.startDate' : '[2012,2015]',
  limit: 5
}, function(err, accounts){
  accounts.each(function(account, next){
    console.log(account.givenName);
    next();
  });
});