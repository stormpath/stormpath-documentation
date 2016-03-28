// Get the Password Strength Policy from the Directory's Password Policy resource
var passwordPolicy = await myDirectory.GetPasswordPolicyAsync();
var strengthPolicy = await passwordPolicy.GetPasswordStrengthPolicyAsync();

// Update and save
strengthPolicy.SetMinimumLength(1)
    .SetMaximumLength(24)
    .SetMinimumSymbols(1);
await strengthPolicy.SaveAsync();
