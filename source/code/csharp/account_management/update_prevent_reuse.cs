var passwordPolicy = await myDirectory.GetPasswordPolicyAsync();
var strengthPolicy = await passwordPolicy.GetPasswordStrengthPolicyAsync();

strengthPolicy.SetPreventReuse(10);
await strengthPolicy.SaveAsync();
