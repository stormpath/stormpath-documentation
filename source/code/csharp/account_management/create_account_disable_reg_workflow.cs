await myDirectory.CreateAccountAsync(
    theAccount,
    opt => opt.RegistrationWorkflowEnabled = false);
