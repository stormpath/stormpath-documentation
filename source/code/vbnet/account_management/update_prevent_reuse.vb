Dim passwordPolicy = Await myDirectory.GetPasswordPolicyAsync()
Dim strengthPolicy = Await passwordPolicy.GetPasswordStrengthPolicyAsync()

strengthPolicy.SetPreventReuse(10)
Await strengthPolicy.SaveAsync()
