var passwordPolicy = await myDirectory.GetPasswordPolicyAsync();

passwordPolicy.SetResetEmailStatus(EmailStatus.Enabled);
await passwordPolicy.SaveAsync();
