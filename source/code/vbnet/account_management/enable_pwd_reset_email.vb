Dim passwordPolicy = Await myDirectory.GetPasswordPolicyAsync()

passwordPolicy.SetResetEmailStatus(EmailStatus.Disabled)
Await passwordPolicy.SaveAsync()
