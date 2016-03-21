await myDirectory.CreateAccountAsync(
    theAccount,
    opt => opt.PasswordFormat = PasswordFormat.MCF);
