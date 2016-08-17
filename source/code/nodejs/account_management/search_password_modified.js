directory.getAccounts({ passwordModifiedAt : '[,2016]' }, function(err, accounts){
  accounts.each(function(account, next){
    console.log(account.email);
    next();
  });
});