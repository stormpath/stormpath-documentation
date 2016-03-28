Dim passwordPolicy = Await myDirectory.GetPasswordPolicyAsync()

passwordPolicy.SetResetEmailStatus(EmailStatus.Enabled)
Await passwordPolicy.SaveAsync()
