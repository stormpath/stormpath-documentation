var passwordPolicy = await myDirectory.GetPasswordPolicyAsync();

passwordPolicy.SetResetEmailStatus(EmailStatus.Disabled);
await passwordPolicy.SaveAsync();
